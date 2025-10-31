export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      <Hero />
      <Mission />
      <Services />
      <Impact />
      <Testimonials />
      <Founder />
      <GrantApplication />
      <Footer />
    </main>
  )
}

const Navigation = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xl">M</span>
        </div>
        <div>
          <div className="text-white font-bold text-lg">Meauxbility</div>
          <div className="text-gray-400 text-xs">501(c)(3) Foundation</div>
        </div>
      </div>
      <div className="hidden md:flex gap-8 items-center">
        <a href="#mission" className="text-gray-200 hover:text-white transition-colors">Mission</a>
        <a href="#services" className="text-gray-200 hover:text-white transition-colors">Services</a>
        <a href="#impact" className="text-gray-200 hover:text-white transition-colors">Impact</a>
        <a href="#apply" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105">
          Apply Now
        </a>
      </div>
    </div>
  </nav>
)

const Hero = () => (
  <section className="relative px-6 pt-32 pb-24 text-center overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    <div className="relative z-10">
      <div className="inline-block mb-6 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full">
        <span className="text-purple-200 text-sm font-medium">🎯 Louisiana's Leading Mobility Foundation</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
        Transform Your Pain
        <br />
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          into Purpose
        </span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
        Join Louisiana's warriors turning struggles into strength.
        <br />
        <span className="text-purple-300 font-semibold">501(c)(3) EIN: 33-4214907</span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a
          href="#apply"
          className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-purple-500/70"
        >
          Apply for Grant
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <a
          href="#donate"
          className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
        >
          Donate Now
        </a>
      </div>

      <div className="mt-16 text-gray-400 text-sm">
        <p>Serving Acadiana • Lafayette, Louisiana</p>
      </div>
    </div>
  </section>
)

const Mission = () => (
  <section id="mission" className="px-6 py-20 bg-white/10 backdrop-blur-lg border-y border-white/10">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Impact by the Numbers</h2>
        <p className="text-gray-300 text-lg">Making a real difference in Acadiana, one warrior at a time</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <MetricCard number="50+" label="Grants Awarded" icon="🎁" />
        <MetricCard number="$250K+" label="Funds Distributed" icon="💰" />
        <MetricCard number="100%" label="Acadiana Coverage" icon="📍" />
      </div>
    </div>
  </section>
)

const MetricCard = ({number, label, icon}: {number: string, label: string, icon: string}) => (
  <div className="text-center group hover:scale-105 transition-transform">
    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
      {number}
    </div>
    <div className="text-gray-300 text-lg font-medium">{label}</div>
  </div>
)

const Services = () => (
  <section id="services" className="px-6 py-20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How We Serve Warriors</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Supporting spinal cord injury survivors with comprehensive programs designed for independence and empowerment
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <ServiceCard
          title="Resilience Building"
          description="Transform challenges into opportunities for growth through mentorship and community support"
          icon="💪"
        />
        <ServiceCard
          title="Community Support"
          description="Connect with others who understand your journey. You're never alone in this fight"
          icon="🤝"
        />
        <ServiceCard
          title="Adaptive Equipment"
          description="Grants for mobility devices, accessibility tools, and home modifications"
          icon="♿"
        />
      </div>
    </div>
  </section>
)

const ServiceCard = ({title, description, icon}: {title: string, description: string, icon: string}) => (
  <div className="group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
)

const Impact = () => (
  <section id="impact" className="px-6 py-24 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTQgMHYyaDJ2LTJoLTJ6bTAgNHYyaDJ2LTJoLTJ6bS00LTh2Mmgydi0yaC0yem00IDB2Mmgydi0yaC0yem0tOCA4djJoMnYtMmgtMnptMCA0djJoMnYtMmgtMnptNCAw djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
        Empowering Mobility.
        <br />
        <span className="text-blue-200">Restoring Independence.</span>
      </h2>
      <p className="text-xl md:text-2xl text-blue-50 leading-relaxed max-w-3xl mx-auto">
        Supporting spinal cord injury survivors across Acadiana with grants for
        adaptive equipment and accessibility services. Every journey is different.
        <strong className="block mt-4 text-white">We champion adversity, no matter where you start.</strong>
      </p>
      <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="text-3xl font-bold text-white mb-2">Acadiana Coverage</div>
          <div className="text-blue-100">Lafayette, Breaux Bridge, Youngsville & Beyond</div>
        </div>
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
          <div className="text-3xl font-bold text-white mb-2">Zero Barriers</div>
          <div className="text-blue-100">Free Application • Fast Response</div>
        </div>
      </div>
    </div>
  </section>
)

const Testimonials = () => (
  <section className="px-6 py-20 bg-black/20">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Warrior Stories</h2>
        <p className="text-gray-300 text-lg">Real impact from real people in our community</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <TestimonialCard
          quote="The grant for my wheelchair ramp changed everything. I can finally access my own home independently."
          author="Marcus T."
          location="Lafayette, LA"
        />
        <TestimonialCard
          quote="Meauxbility didn't just help me financially—they connected me with a community that understands."
          author="Sarah D."
          location="Breaux Bridge, LA"
        />
        <TestimonialCard
          quote="From application to approval in 2 weeks. They actually care about getting you the help you need, fast."
          author="James R."
          location="Youngsville, LA"
        />
      </div>
    </div>
  </section>
)

const TestimonialCard = ({quote, author, location}: {quote: string, author: string, location: string}) => (
  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-purple-400/30 transition-all">
    <div className="text-purple-400 text-5xl mb-4">"</div>
    <p className="text-gray-200 text-lg mb-6 leading-relaxed italic">{quote}</p>
    <div className="border-t border-white/10 pt-4">
      <div className="text-white font-bold">{author}</div>
      <div className="text-gray-400 text-sm">{location}</div>
    </div>
  </div>
)

const Founder = () => (
  <section className="px-6 py-20 bg-gradient-to-r from-indigo-900 to-purple-900">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-2 border border-white/20">
            <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-8xl mb-4">👨‍🦽</div>
                <div className="text-2xl font-bold">Sam Primeaux</div>
                <div className="text-blue-200">Founder & Warrior</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full">
            <span className="text-purple-200 text-sm font-medium">Meet Our Founder</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Turning Personal Pain into Community Purpose
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            Sam Primeaux founded Meauxbility Foundation at 25 years old with a simple belief:
            <strong className="text-white"> no one should face their mobility challenges alone.</strong>
          </p>
          <p className="text-gray-200 text-lg leading-relaxed mb-6">
            After navigating the complex world of spinal cord injury recovery in Louisiana,
            Sam saw a gap—warriors needed more than just medical care. They needed community,
            understanding, and practical support to reclaim their independence.
          </p>
          <p className="text-gray-200 text-lg leading-relaxed">
            Today, Meauxbility serves as Louisiana's champion for mobility access,
            helping warriors transform their struggles into strength, one grant at a time.
          </p>
        </div>
      </div>
    </div>
  </section>
)

const GrantApplication = () => (
  <section id="apply" className="px-6 py-24 bg-black/20">
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full">
          <span className="text-purple-200 text-sm font-medium">✨ Quick & Easy</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Start Your Application
        </h2>
        <p className="text-gray-300 text-lg">
          No complex paperwork. Just tell us your story and what you need.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Full Name *</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Email Address *</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Phone Number</label>
              <input
                type="tel"
                placeholder="(337) 555-0123"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2 text-sm">Location (City)</label>
              <input
                type="text"
                placeholder="Lafayette, LA"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm">What type of support are you seeking?</label>
            <select className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all">
              <option className="bg-gray-900">Adaptive Equipment (wheelchair, etc.)</option>
              <option className="bg-gray-900">Home Modifications (ramps, etc.)</option>
              <option className="bg-gray-900">Vehicle Modifications</option>
              <option className="bg-gray-900">Assistive Technology</option>
              <option className="bg-gray-900">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-medium mb-2 text-sm">Tell Us Your Story *</label>
            <textarea
              placeholder="Share your journey, your challenges, and how this grant would help you reclaim your independence..."
              rows={6}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all resize-none"
              required
            />
          </div>

          <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4">
            <p className="text-sm text-purple-200">
              <strong>✓ Fast Response:</strong> Most applications reviewed within 2 weeks
              <br />
              <strong>✓ Confidential:</strong> Your information is secure and private
              <br />
              <strong>✓ Free:</strong> No application fees, ever
            </p>
          </div>

          <button
            type="submit"
            className="group w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-5 rounded-xl text-lg font-bold shadow-2xl shadow-purple-500/50 transition-all hover:scale-[1.02] hover:shadow-purple-500/70"
          >
            Submit Application
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>

          <p className="text-center text-gray-400 text-sm">
            Questions? Email us at <a href="mailto:sam@meauxbility.org" className="text-purple-400 hover:text-purple-300">sam@meauxbility.org</a>
          </p>
        </form>
      </div>
    </div>
  </section>
)

const Footer = () => (
  <footer id="donate" className="px-6 py-16 bg-black/50 backdrop-blur-lg border-t border-white/10">
    <div className="max-w-7xl mx-auto">
      {/* Donation CTA */}
      <div className="text-center mb-16 pb-16 border-b border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Help Us Help More Warriors
        </h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Every donation directly funds grants for adaptive equipment and accessibility services.
          <br />
          100% of donations go to warriors in need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://donate.stripe.com/your-donation-link"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-10 py-4 rounded-xl text-lg font-semibold shadow-2xl shadow-purple-500/50 transition-all hover:scale-105"
          >
            Make a Donation
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">❤️</span>
          </a>
          <a
            href="#apply"
            className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-10 py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105"
          >
            Apply for Grant
          </a>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg">Meauxbility</div>
              <div className="text-gray-400 text-xs">501(c)(3) Foundation</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Empowering mobility and restoring independence for spinal cord injury survivors across Louisiana.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#mission" className="text-gray-400 hover:text-white transition-colors">Our Mission</a></li>
            <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
            <li><a href="#impact" className="text-gray-400 hover:text-white transition-colors">Our Impact</a></li>
            <li><a href="#apply" className="text-gray-400 hover:text-white transition-colors">Apply for Grant</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📧 <a href="mailto:sam@meauxbility.org" className="hover:text-white transition-colors">sam@meauxbility.org</a></li>
            <li>📞 <a href="tel:+13374509998" className="hover:text-white transition-colors">(337) 450-9998</a></li>
            <li>📍 Lafayette, Louisiana</li>
            <li>🏛️ Serving all of Acadiana</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><strong className="text-white">501(c)(3) EIN:</strong><br />33-4214907</li>
            <li className="pt-2">Tax-deductible donations</li>
            <li>Federally recognized nonprofit</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-8 border-t border-white/10">
        <p className="text-gray-400 text-sm">
          © 2024 Meauxbility Foundation. All rights reserved.
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> • </span>
          Transforming pain into purpose, one warrior at a time.
        </p>
      </div>
    </div>
  </footer>
)
