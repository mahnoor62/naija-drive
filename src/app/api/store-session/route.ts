import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { ensureDb } from '@/lib/db-init';

// NOTE: paths match your tree: src/app/api/models/*
const User = require('../models/user');
const Purchase = require('../models/transaction');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function genRedeemCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digits
}

export async function POST(req: NextRequest) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: 'session_id required' }, { status: 400 });

    // 1) Stripe se session lao
    const s = await stripe.checkout.sessions.retrieve(session_id);

    const email =
      s.customer_details?.email ??
      (s.customer_email as string | null) ??
      null;

    const paymentIntentId = (s.payment_intent as string) ?? null;
    if (!email || !paymentIntentId) {
      return NextResponse.json({ error: 'missing email/payment_intent' }, { status: 422 });
    }

    // 2) DB ready
    await ensureDb();

    // 3) User upsert
    const [user] = await User.findOrCreate({
      where: { email },
      defaults: { email },
    });

    // 4) Transaction idempotent write on paymentIntent
    const [tx, created] = await Purchase.findOrCreate({
      where: { paymentIntent: paymentIntentId },
      defaults: {
        userId: user.id,
        paymentIntent: paymentIntentId,
        sessionId: s.id,
        redeemCode: genRedeemCode(),
        metadata: { carId: s.metadata?.carId, carName: s.metadata?.carName }, 
      },
    });

    // (optional) backfill sessionId if old row had null
    if (!created && !tx.sessionId) {
      await tx.update({ sessionId: s.id });
    }

    return NextResponse.json({
      ok: true,
      created,
      email,
      paymentIntent: tx.paymentIntent,
      redeemCode: tx.redeemCode,
      sessionId: s.id,
      carName: s.metadata?.carName ?? null,
      amount: (s.amount_total ?? 0) / 100,
      currency: s.currency,
    });
  } catch (e: any) {
    console.error('Store session error:', e);
    console.error('Error stack:', e.stack);
    return NextResponse.json({ 
      error: e.message ?? 'error',
      details: e.toString(),
      stack: e.stack 
    }, { status: 500 });
  }
}
