export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Hero />
      <Mission />
      <Services />
      <Impact />
      <GrantApplication />
      <Footer />
    </main>
  )
}

const Hero = () => (
  <section className="relative px-6 py-24 text-center">
    <h1 className="text-6xl font-bold text-white mb-6">
      Transform Your Pain into Purpose
    </h1>
    <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
      Join Louisiana's warriors turning struggles into strength.
      501(c)(3) EIN: 33-4214907
    </p>
    <div className="flex gap-4 justify-center">
      <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold">
        Apply for Grant
      </button>
      <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold">
        Donate Now
      </button>
    </div>
  </section>
)

const Mission = () => (
  <section className="px-6 py-16 bg-white/10 backdrop-blur-lg">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <MetricCard number="50+" label="Grants Awarded" />
      <MetricCard number="$250K+" label="Funds Distributed" />
      <MetricCard number="100%" label="Acadiana Coverage" />
    </div>
  </section>
)

const MetricCard = ({number, label}: {number: string, label: string}) => (
  <div className="text-center">
    <div className="text-5xl font-bold text-white mb-2">{number}</div>
    <div className="text-gray-300">{label}</div>
  </div>
)

const Services = () => (
  <section className="px-6 py-16">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <ServiceCard
        title="Resilience Building"
        description="Transform challenges into opportunities for growth"
      />
      <ServiceCard
        title="Community Support"
        description="Connect with others who understand your journey"
      />
      <ServiceCard
        title="Adaptive Equipment"
        description="Grants for mobility devices and accessibility tools"
      />
    </div>
  </section>
)

const ServiceCard = ({title, description}: {title: string, description: string}) => (
  <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
)

const Impact = () => (
  <section className="px-6 py-16 bg-gradient-to-r from-purple-600 to-blue-600">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-white mb-6">
        Empowering Mobility. Restoring Independence.
      </h2>
      <p className="text-xl text-gray-100">
        Supporting spinal cord injury survivors across Acadiana with grants for
        adaptive equipment and accessibility services. Every journey is different.
        We champion adversity, no matter where you start.
      </p>
    </div>
  </section>
)

const GrantApplication = () => (
  <section className="px-6 py-16">
    <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Our Application, Simplified
      </h2>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
        />
        <textarea
          placeholder="Tell us your story..."
          rows={4}
          className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
        />
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg text-lg font-semibold">
          Submit Application
        </button>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer className="px-6 py-12 bg-black/50 backdrop-blur-lg">
    <div className="max-w-7xl mx-auto text-center text-gray-400">
      <p>© 2024 Meauxbility Foundation | 501(c)(3) EIN: 33-4214907</p>
      <p>Lafayette, Louisiana • sam@meauxbility.org</p>
    </div>
  </footer>
)
