export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Mission />
    </main>
  )
}

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black">
    <div className="text-center px-6">
      <h1 className="text-7xl font-bold text-white mb-6 tracking-tight">
        UNLEASH YOUR<br />INNER WARRIOR
      </h1>
      <p className="text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
        Premium apparel for those who refuse to be defined by their challenges
      </p>
      <a
        href="/shop"
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
      >
        Shop Collection
      </a>
    </div>
  </section>
)

const FeaturedProducts = () => (
  <section className="py-20 px-6 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">Featured Collection</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <ProductCard
          name="Warrior Tee"
          price="$35"
          image="/products/warrior-tee.jpg"
          description="Premium cotton, built to last"
        />
        <ProductCard
          name="Resilience Hoodie"
          price="$65"
          image="/products/resilience-hoodie.jpg"
          description="Comfort meets strength"
        />
        <ProductCard
          name="Victory Cap"
          price="$25"
          image="/products/victory-cap.jpg"
          description="Crown your achievements"
        />
      </div>
    </div>
  </section>
)

const ProductCard = ({ name, price, image, description }: { name: string, price: string, image: string, description: string }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
    <div className="h-80 bg-gradient-to-br from-purple-600 to-black flex items-center justify-center">
      <span className="text-white text-2xl font-bold">{name}</span>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-purple-600">{price}</span>
        <button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
)

const Mission = () => (
  <section className="py-20 px-6 bg-black text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
      <p className="text-xl text-gray-300 mb-8">
        Every purchase from Inner Animals directly supports the Meauxbility Foundation,
        helping spinal cord injury survivors across Louisiana access the adaptive equipment
        and services they need to thrive.
      </p>
      <a
        href="https://meauxbility.org"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
      >
        Learn More About Our Cause
      </a>
    </div>
  </section>
)
