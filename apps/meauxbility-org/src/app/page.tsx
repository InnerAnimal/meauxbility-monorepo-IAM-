'use client';

import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Hero />
      <Mission />
      <Services />
      <Impact />
      <GrantApplication />
      <DonationSection />
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

const GrantApplication = () => {
  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    phone: '',
    story: '',
    amount: '',
    equipmentType: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/grants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSuccess(true);
      setFormData({
        applicantName: '',
        email: '',
        phone: '',
        story: '',
        amount: '',
        equipmentType: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply" className="px-6 py-16">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Our Application, Simplified
        </h2>
        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-100">
            Thank you! Your grant application has been submitted successfully. We'll review it and get back to you soon.
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Full Name *"
            required
            value={formData.applicantName}
            onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Equipment Type (e.g., Wheelchair, Ramp, Vehicle Modifications)"
            value={formData.equipmentType}
            onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Requested Amount (e.g., $5000)"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <textarea
            placeholder="Tell us your story... *"
            required
            rows={4}
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white py-4 rounded-lg text-lg font-semibold"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </section>
  );
};

const DonationSection = () => {
  const [donationData, setDonationData] = useState({
    donorName: '',
    email: '',
    amount: '',
    recurring: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  const quickDonate = (amount: number) => {
    setDonationData({ ...donationData, amount: amount.toString() });
  };

  return (
    <section id="donate" className="px-6 py-16 bg-white/5 backdrop-blur-lg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          Support Our Mission
        </h2>
        <p className="text-gray-200 text-center mb-8">
          Every donation helps provide adaptive equipment and support to those in need.
        </p>
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-100">
            {error}
          </div>
        )}
        <form onSubmit={handleDonation} className="space-y-6">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[25, 50, 100, 250].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => quickDonate(amt)}
                className={`p-4 rounded-lg border-2 font-semibold ${
                  donationData.amount === amt.toString()
                    ? 'bg-purple-600 border-purple-400 text-white'
                    : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={donationData.donorName}
            onChange={(e) => setDonationData({ ...donationData, donorName: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email Address *"
            required
            value={donationData.email}
            onChange={(e) => setDonationData({ ...donationData, email: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <input
            type="number"
            placeholder="Custom Amount *"
            required
            value={donationData.amount}
            onChange={(e) => setDonationData({ ...donationData, amount: e.target.value })}
            className="w-full p-4 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400"
          />
          <label className="flex items-center text-white">
            <input
              type="checkbox"
              checked={donationData.recurring}
              onChange={(e) => setDonationData({ ...donationData, recurring: e.target.checked })}
              className="mr-3 h-5 w-5"
            />
            Make this a monthly donation
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white py-4 rounded-lg text-lg font-semibold"
          >
            {loading ? 'Processing...' : 'Donate Now'}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6 text-sm">
          Secure payment processing powered by Stripe. Your donation is tax-deductible.
        </p>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="px-6 py-12 bg-black/50 backdrop-blur-lg">
    <div className="max-w-7xl mx-auto text-center text-gray-400">
      <p>© 2024 Meauxbility Foundation | 501(c)(3) EIN: 33-4214907</p>
      <p>Lafayette, Louisiana • sam@meauxbility.org</p>
    </div>
  </footer>
)
