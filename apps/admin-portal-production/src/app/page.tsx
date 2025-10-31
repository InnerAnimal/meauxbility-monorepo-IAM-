'use client';

import { useState, useEffect } from 'react';

interface Stats {
  totalGrants: number;
  pendingGrants: number;
  approvedGrants: number;
  totalDonations: number;
  totalOrders: number;
  totalFundsDistributed: number;
  recentGrants: any[];
  recentDonations: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/stats');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load statistics');
      }

      setStats(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Meauxbility Admin Portal</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-white">Loading dashboard...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 text-red-100 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && stats && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <StatCard title="Total Grants" value={stats.totalGrants.toString()} color="purple" />
              <StatCard title="Pending Applications" value={stats.pendingGrants.toString()} color="blue" />
              <StatCard
                title="Funds Distributed"
                value={`$${stats.totalFundsDistributed.toLocaleString()}`}
                color="green"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <DashboardCard title="Recent Applications">
                <div className="space-y-4">
                  {stats.recentGrants.length > 0 ? (
                    stats.recentGrants.map((grant: any) => (
                      <ApplicationItem
                        key={grant.id}
                        name={grant.applicant_name}
                        status={grant.status}
                        email={grant.email}
                        date={new Date(grant.created_at).toLocaleDateString()}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No grant applications yet</p>
                  )}
                </div>
              </DashboardCard>

              <DashboardCard title="Recent Donations">
                <div className="space-y-4">
                  {stats.recentDonations.length > 0 ? (
                    stats.recentDonations.map((donation: any) => (
                      <DonationItem
                        key={donation.id}
                        name={donation.donor_name || 'Anonymous'}
                        amount={donation.amount}
                        date={new Date(donation.created_at).toLocaleDateString()}
                        recurring={donation.recurring}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No donations yet</p>
                  )}
                </div>
              </DashboardCard>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => {
  const colorClasses = {
    purple: 'from-purple-600 to-purple-800',
    blue: 'from-blue-600 to-blue-800',
    green: 'from-green-600 to-green-800',
  };

  return (
    <div
      className={`bg-gradient-to-br ${
        colorClasses[color as keyof typeof colorClasses]
      } rounded-xl p-6 text-white shadow-lg`}
    >
      <h3 className="text-lg font-semibold mb-2 opacity-90">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
};

const DashboardCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
    <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
    {children}
  </div>
);

const ApplicationItem = ({
  name,
  status,
  email,
  date,
}: {
  name: string;
  status: string;
  email?: string;
  date?: string;
}) => {
  const statusColor = status === 'approved' ? 'bg-green-500' : 'bg-yellow-500';

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
      <div>
        <span className="text-white font-medium block">{name}</span>
        {email && <span className="text-gray-400 text-sm">{email}</span>}
        {date && <span className="text-gray-500 text-xs block">{date}</span>}
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColor}`}>
        {status}
      </span>
    </div>
  );
};

const DonationItem = ({
  name,
  amount,
  date,
  recurring,
}: {
  name: string;
  amount: number;
  date: string;
  recurring?: boolean;
}) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
    <div>
      <span className="text-white font-medium block">{name}</span>
      <span className="text-gray-500 text-xs">{date}</span>
      {recurring && <span className="text-purple-400 text-xs block">Monthly</span>}
    </div>
    <span className="text-green-400 font-bold">${parseFloat(amount.toString()).toFixed(2)}</span>
  </div>
);
