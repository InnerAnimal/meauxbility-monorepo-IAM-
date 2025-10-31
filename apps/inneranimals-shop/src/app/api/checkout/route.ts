import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE || '';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerEmail, customerName, shippingAddress } = body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'Customer email is required' },
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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate total amount
    const totalAmount = items.reduce(
      (total: number, item: any) => total + item.price * item.quantity,
      0
    );

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: item.description || '',
            images: item.image_url ? [item.image_url] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${appUrl}/cart?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart?checkout=cancelled`,
      customer_email: customerEmail,
      metadata: {
        customer_name: customerName || '',
        shipping_address: shippingAddress || '',
      },
    });

    // Create order in database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          customer_email: customerEmail,
          customer_name: customerName || null,
          total_amount: totalAmount,
          status: 'pending',
          stripe_payment_id: session.id,
          shipping_address: shippingAddress || null,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (orderError) {
      console.error('Order creation error:', orderError);
      // Continue with checkout even if order creation fails
    }

    // Create order items if order was created successfully
    if (orderData && orderData[0]) {
      const orderId = orderData[0].id;
      const orderItems = items.map((item: any) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Order items creation error:', itemsError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        sessionId: session.id,
        url: session.url,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
