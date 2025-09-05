import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { cars } from '@/data/cars';

export async function POST(request: NextRequest) {
  try {
    const { carId } = await request.json();

    if (!carId) {
      return NextResponse.json({ error: 'Car ID is required' }, { status: 400 });
    }

    const car = cars.find(c => c.id === carId);
    if (!car) {
      return NextResponse.json({ error: 'Car not found' }, { status: 404 });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'ngn',
            product_data: {
              name: car.name,
              description: car.description,
              // Only include image if it's a valid URL, otherwise omit it
              ...(car.image && car.image.startsWith('http') && { images: [car.image] }),
            },
            unit_amount: car.price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/?car=${carId}`,
      metadata: {
        carId: car.id,
        carName: car.name,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
