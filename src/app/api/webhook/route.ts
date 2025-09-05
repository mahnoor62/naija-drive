import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import Stripe from 'stripe';
import { ensureDb } from '@/lib/db-init';
const User = require('../models/user');
const Purchase = require('../models/transaction');

function genRedeemCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digits
}



export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("event", event)
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }


  try {
    await ensureDb(); // safe no-op after first time

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const email =
        session.customer_details?.email ??
        (session.customer_email as string | null) ??
        null;

      const paymentIntentId = session.payment_intent as string | null;
      const sessionId = session.id;
      const carId = session.metadata?.carId ?? null;
      const carName = session.metadata?.carName ?? null;

      if (!email || !paymentIntentId) {
        // Nothing to store safely without these
        return NextResponse.json({ received: true }); // don't 500 Stripe
      }

      // Upsert user
      const [user] = await User.findOrCreate({
        where: { email },
        defaults: { email },
      });

      // Idempotency: if this PI already saved, do nothing
      const existing = await Purchase.findOne({ where: { paymentIntent: paymentIntentId } });
      if (!existing) {
        const redeemCode = genRedeemCode();

        await Purchase.create({
          userId: user.id,
          paymentIntent: paymentIntentId,
          redeemCode,
          sessionId,
          metadata: { carId, carName },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err);
    // Return 200 to prevent Stripe retries if error is non-retryable DB issue
    return NextResponse.json({ received: true });
  }

}
