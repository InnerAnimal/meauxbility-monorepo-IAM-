import { NextRequest, NextResponse } from 'next/server';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, donorName, email, recurring } = body;

    // Validate required fields
    if (!amount || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: amount and email are required' },
        { status: 400 }
      );
    }

    // Validate amount
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      return NextResponse.json(
        { error: 'Invalid donation amount' },
        { status: 400 }
      );
    }

    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      );
    }

    const stripe = require('stripe')(stripeSecretKey);

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: recurring ? 'Monthly Donation to Meauxbility Foundation' : 'Donation to Meauxbility Foundation',
              description: 'Supporting musicians with ALS and other neurodegenerative diseases',
            },
            unit_amount: Math.round(donationAmount * 100), // Convert to cents
            ...(recurring && {
              recurring: {
                interval: 'month',
              },
            }),
          },
          quantity: 1,
        },
      ],
      mode: recurring ? 'subscription' : 'payment',
      success_url: `${appUrl}?donation=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}?donation=cancelled`,
      customer_email: email,
      metadata: {
        donor_name: donorName || '',
        recurring: recurring ? 'true' : 'false',
      },
    });

    return NextResponse.json(
      {
        success: true,
        sessionId: session.id,
        url: session.url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
