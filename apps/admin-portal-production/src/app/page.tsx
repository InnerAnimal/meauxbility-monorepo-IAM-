export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Meauxbility Admin Portal</h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Total Grants" value="50+" color="purple" />
          <StatCard title="Pending Applications" value="12" color="blue" />
          <StatCard title="Funds Distributed" value="$250K+" color="green" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <DashboardCard title="Recent Applications">
            <div className="space-y-4">
              <ApplicationItem name="John Doe" status="pending" />
              <ApplicationItem name="Jane Smith" status="approved" />
              <ApplicationItem name="Mike Johnson" status="pending" />
            </div>
          </DashboardCard>

          <DashboardCard title="Quick Actions">
            <div className="space-y-3">
              <ActionButton label="Review Applications" />
              <ActionButton label="Manage Grants" />
              <ActionButton label="View Analytics" />
              <ActionButton label="Donor Management" />
            </div>
          </DashboardCard>
        </div>
      </div>
    </main>
  )
}

const StatCard = ({ title, value, color }: { title: string, value: string, color: string }) => {
  const colorClasses = {
    purple: "from-purple-600 to-purple-800",
    blue: "from-blue-600 to-blue-800",
    green: "from-green-600 to-green-800"
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl p-6 text-white shadow-lg`}>
      <h3 className="text-lg font-semibold mb-2 opacity-90">{title}</h3>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  )
}

const DashboardCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
    <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
    {children}
  </div>
)

const ApplicationItem = ({ name, status }: { name: string, status: string }) => {
  const statusColor = status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
      <span className="text-white font-medium">{name}</span>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColor}`}>
        {status}
      </span>
    </div>
  )
}

const ActionButton = ({ label }: { label: string }) => (
  <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
    {label}
  </button>
)
