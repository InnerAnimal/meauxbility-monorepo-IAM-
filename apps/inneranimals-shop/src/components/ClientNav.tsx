'use client';

import { useCart } from '@/context/CartContext';

export default function ClientNav() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">INNER ANIMALS</h1>
        <div className="flex gap-6 items-center">
          <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
          <a href="/shop" className="hover:text-purple-400 transition-colors">Shop</a>
          <a href="/cart" className="hover:text-purple-400 transition-colors relative">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </a>
          <a href="/about" className="hover:text-purple-400 transition-colors">Mission</a>
        </div>
      </div>
    </nav>
  );
}
