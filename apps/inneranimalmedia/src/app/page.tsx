export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">
            Inner Animal Media
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            Stories of Resilience, Strength, and the Warrior Spirit Within
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#stories"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Explore Stories
            </a>
            <a
              href="#about"
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold backdrop-blur transition-colors"
            >
              About Us
            </a>
          </div>
        </div>

        {/* Mission Section */}
        <section id="about" className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-purple-100 leading-relaxed mb-4">
              Inner Animal Media is a platform dedicated to sharing authentic stories
              of resilience, recovery, and the indomitable human spirit. We amplify
              voices of those who have faced adversity and emerged stronger.
            </p>
            <p className="text-lg text-purple-100 leading-relaxed">
              Through powerful narratives, documentaries, and multimedia content,
              we inspire others to discover their own inner strength and warrior spirit.
            </p>
          </div>
        </section>

        {/* Content Preview Section */}
        <section id="stories" className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Featured Content
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Story Card 1 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600"></div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Stories of Triumph</h3>
                <p className="text-purple-100 mb-4">
                  Real stories from real warriors who overcame the impossible.
                </p>
                <button className="text-purple-300 hover:text-white font-semibold">
                  Read More →
                </button>
              </div>
            </div>

            {/* Story Card 2 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600"></div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Documentary Series</h3>
                <p className="text-purple-100 mb-4">
                  In-depth video documentaries exploring resilience and recovery.
                </p>
                <button className="text-purple-300 hover:text-white font-semibold">
                  Watch Now →
                </button>
              </div>
            </div>

            {/* Story Card 3 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform">
              <div className="h-48 bg-gradient-to-br from-pink-600 to-purple-600"></div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Podcast Episodes</h3>
                <p className="text-purple-100 mb-4">
                  Conversations with warriors sharing their journey and wisdom.
                </p>
                <button className="text-purple-300 hover:text-white font-semibold">
                  Listen →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-16 text-purple-200">
          <p className="mb-2">
            Part of the <a href="https://meauxbility.org" className="text-purple-300 hover:text-white font-semibold">Meauxbility Foundation</a>
          </p>
          <p className="text-sm">
            © 2025 Inner Animal Media. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
