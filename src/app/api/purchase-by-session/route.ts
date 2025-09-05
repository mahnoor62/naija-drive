import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { ensureDb } from '@/lib/db-init';
import User from '../models/user.js';
import Purchase from '../models/transaction.js';

interface PurchaseWithUser {
  paymentIntent: string;
  redeemCode: string;
  user?: {
    email: string;
  };
}

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

    // Type assertion to handle Sequelize model types
    const rowData = row as unknown as PurchaseWithUser;

    return NextResponse.json({
      ready: true,
      email: rowData.user?.email ?? null,
      paymentIntent: rowData.paymentIntent,
      redeemCode: rowData.redeemCode,
      carName: session.metadata?.carName ?? null,
      amount: (session.amount_total ?? 0) / 100,
      currency: session.currency,
    });
  } catch (e: unknown) {
    const error = e as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
