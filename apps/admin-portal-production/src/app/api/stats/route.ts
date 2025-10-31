import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE || '';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get grant statistics
    const { data: grants, error: grantsError } = await supabase
      .from('grants')
      .select('*');

    if (grantsError) {
      console.error('Grants error:', grantsError);
    }

    // Get donation statistics
    const { data: donations, error: donationsError } = await supabase
      .from('donations')
      .select('*');

    if (donationsError) {
      console.error('Donations error:', donationsError);
    }

    // Get order statistics
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*');

    if (ordersError) {
      console.error('Orders error:', ordersError);
    }

    // Calculate statistics
    const totalGrants = grants?.length || 0;
    const pendingGrants = grants?.filter((g) => g.status === 'pending').length || 0;
    const approvedGrants = grants?.filter((g) => g.status === 'approved').length || 0;

    const totalDonations = donations?.reduce((sum, d) => sum + parseFloat(d.amount || '0'), 0) || 0;
    const totalOrders = orders?.reduce((sum, o) => sum + parseFloat(o.total_amount || '0'), 0) || 0;

    const totalFundsDistributed = totalDonations + totalOrders;

    return NextResponse.json(
      {
        success: true,
        data: {
          totalGrants,
          pendingGrants,
          approvedGrants,
          totalDonations,
          totalOrders,
          totalFundsDistributed,
          recentGrants: grants?.slice(0, 5) || [],
          recentDonations: donations?.slice(0, 5) || [],
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
