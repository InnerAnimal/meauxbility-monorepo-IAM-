import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE || '';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicantName, email, phone, story, amount, equipmentType } = body;

    // Validate required fields
    if (!applicantName || !email || !story) {
      return NextResponse.json(
        { error: 'Missing required fields: applicantName, email, and story are required' },
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

    // Initialize Supabase client with service role for backend operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert grant application
    const { data, error } = await supabase
      .from('grants')
      .insert([
        {
          applicant_name: applicantName,
          email,
          phone: phone || null,
          story,
          amount: amount || null,
          equipment_type: equipmentType || null,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit grant application', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Grant application submitted successfully',
        data: data[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Grant application error:', error);
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
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    let query = supabase
      .from('grants')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch grant applications', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data,
        count: data.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Grant fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
