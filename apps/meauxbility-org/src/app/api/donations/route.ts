import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE || '';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { donorName, email, amount, recurring, paymentMethodId } = body;

    // Validate required fields
    if (!donorName || !email || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: donorName, email, and amount are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
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

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let stripePaymentId = null;

    // Process Stripe payment if payment method provided
    if (paymentMethodId && stripeSecretKey) {
      try {
        const stripe = require('stripe')(stripeSecretKey);

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(donationAmount * 100), // Convert to cents
          currency: 'usd',
          payment_method: paymentMethodId,
          confirm: true,
          automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
          },
          description: `Donation from ${donorName}`,
          receipt_email: email,
          metadata: {
            donor_name: donorName,
            recurring: recurring ? 'true' : 'false',
          },
        });

        stripePaymentId = paymentIntent.id;

        // Check if payment succeeded
        if (paymentIntent.status !== 'succeeded') {
          return NextResponse.json(
            { error: 'Payment failed', details: paymentIntent.status },
            { status: 402 }
          );
        }
      } catch (stripeError: any) {
        console.error('Stripe error:', stripeError);
        return NextResponse.json(
          { error: 'Payment processing failed', details: stripeError.message },
          { status: 402 }
        );
      }
    }

    // Insert donation record
    const { data, error } = await supabase
      .from('donations')
      .insert([
        {
          donor_name: donorName,
          email,
          amount: donationAmount,
          recurring: recurring || false,
          stripe_payment_id: stripePaymentId,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to record donation', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Donation processed successfully',
        data: data[0],
        paymentId: stripePaymentId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Donation processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const recurring = searchParams.get('recurring');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (recurring !== null) {
      query = query.eq('recurring', recurring === 'true');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch donations', details: error.message },
        { status: 500 }
      );
    }

    // Calculate total donations
    const total = data.reduce((sum, donation) => sum + parseFloat(donation.amount || '0'), 0);

    return NextResponse.json(
      {
        success: true,
        data,
        count: data.length,
        total: total.toFixed(2),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Donations fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
