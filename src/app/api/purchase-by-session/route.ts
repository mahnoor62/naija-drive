import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { ensureDb } from '@/lib/db-init';
const User = require('../models/user');
const Purchase = require('../models/transaction');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return NextResponse.json({ error: 'session_id required' }, { status: 400 });

    // (Optional) Verify the session exists in Stripe for sanity
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    await ensureDb();
    const row = await Purchase.findOne({
      where: { sessionId },
      include: [{ model: User, attributes: ['email'] }],
    });

    if (!row) {
      // Fallback: maybe webhook delay; allow client to re-poll
      return NextResponse.json({ ready: false });
    }

    return NextResponse.json({
      ready: true,
      email: row.user?.email ?? null,
      paymentIntent: row.paymentIntent,
      redeemCode: row.redeemCode,
      carName: session.metadata?.carName ?? null,
      amount: (session.amount_total ?? 0) / 100,
      currency: session.currency,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
