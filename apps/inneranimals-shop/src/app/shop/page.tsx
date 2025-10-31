'use client';

import { useCart, Product } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const url = selectedCategory
        ? `/api/products?category=${encodeURIComponent(selectedCategory)}`
        : '/api/products';

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load products');
      }

      setProducts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const categories = ['T-Shirts', 'Hoodies', 'Sweatshirts', 'Accessories'];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold mb-8">Shop Collection</h1>

        <div className="flex gap-8">
          <aside className="w-64 shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`text-left w-full ${
                      selectedCategory === null
                        ? 'text-purple-600 font-semibold'
                        : 'text-gray-700 hover:text-purple-600'
                    }`}
                  >
                    All Products
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`text-left w-full ${
                        selectedCategory === category
                          ? 'text-purple-600 font-semibold'
                          : 'text-gray-700 hover:text-purple-600'
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-600">Loading products...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-500 rounded-lg p-6 text-red-700">
                {error}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500 text-lg">No products available</p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  >
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-64 w-full object-cover"
                      />
                    ) : (
                      <div className="h-64 bg-gradient-to-br from-purple-600 to-black flex items-center justify-center">
                        <span className="text-white text-xl font-bold">{product.name}</span>
                      </div>
                    )}
                    <div className="p-4">
                      {product.category && (
                        <span className="text-sm text-gray-500">{product.category}</span>
                      )}
                      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                      {product.description && (
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                      )}
                      {product.brand && (
                        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl font-bold text-purple-600">
                          ${product.price.toFixed(2)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
                            addedToCart === product.id
                              ? 'bg-green-600 text-white'
                              : 'bg-black hover:bg-gray-800 text-white'
                          }`}
                        >
                          {addedToCart === product.id ? 'Added!' : 'Add to Cart'}
                        </button>
                      </div>
                      {product.inventory !== undefined && product.inventory < 10 && (
                        <p className="text-xs text-orange-600 mt-2">
                          Only {product.inventory} left in stock
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
