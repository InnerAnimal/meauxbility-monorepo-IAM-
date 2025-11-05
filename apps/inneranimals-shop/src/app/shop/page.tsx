export default function Shop() {
  const products = [
    { id: 1, name: "Warrior Tee", price: "$35", category: "T-Shirts" },
    { id: 2, name: "Resilience Hoodie", price: "$65", category: "Hoodies" },
    { id: 3, name: "Victory Cap", price: "$25", category: "Accessories" },
    { id: 4, name: "Strength Tank", price: "$30", category: "T-Shirts" },
    { id: 5, name: "Champion Crew", price: "$45", category: "Sweatshirts" },
    { id: 6, name: "Courage Beanie", price: "$20", category: "Accessories" },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-8">Shop Collection</h1>

        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-purple-600">All Products</a></li>
                <li><a href="#" className="text-gray-700 hover:text-purple-600">T-Shirts</a></li>
                <li><a href="#" className="text-gray-700 hover:text-purple-600">Hoodies</a></li>
                <li><a href="#" className="text-gray-700 hover:text-purple-600">Accessories</a></li>
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <div className="grid md:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                  <div className="h-64 bg-gradient-to-br from-purple-600 to-black flex items-center justify-center">
                    <span className="text-white text-xl font-bold">{product.name}</span>
                  </div>
                  <div className="p-4">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-purple-600">{product.price}</span>
                      <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded font-semibold text-sm transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
