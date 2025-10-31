'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check for checkout success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('checkout') === 'success') {
      setSuccess(true);
      clearCart();
    }
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          customerEmail,
          customerName,
          shippingAddress,
        }),
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

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-green-50 border border-green-500 rounded-lg p-8 text-center">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Order Successful!</h1>
            <p className="text-green-700 mb-6">
              Thank you for your purchase! You'll receive a confirmation email shortly.
            </p>
            <a
              href="/shop"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
              <a
                href="/shop"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-md flex gap-6">
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  {item.brand && <p className="text-gray-600 mb-2">{item.brand}</p>}
                  <p className="text-purple-600 font-bold text-lg">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-lg p-6 shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            <div className="mb-6 pb-6 border-b">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-purple-600">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-500 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 border rounded"
              />
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full p-3 border rounded"
              />
              <textarea
                placeholder="Shipping Address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                rows={3}
                className="w-full p-3 border rounded"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>

            <p className="text-center text-gray-500 text-xs mt-4">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
