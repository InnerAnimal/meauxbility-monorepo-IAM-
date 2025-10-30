import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inner Animals - Unleash Your Inner Warrior',
  description: 'Premium apparel supporting Meauxbility Foundation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-black text-white p-4 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wider">INNER ANIMALS</h1>
            <div className="flex gap-6">
              <a href="/" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="/shop" className="hover:text-purple-400 transition-colors">Shop</a>
              <a href="/cart" className="hover:text-purple-400 transition-colors">Cart</a>
              <a href="/about" className="hover:text-purple-400 transition-colors">Mission</a>
            </div>
          </div>
        </nav>
        {children}
        <footer className="bg-black text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400 mb-4">
              Every purchase supports the Meauxbility Foundation
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 Inner Animals | A brand supporting spinal cord injury survivors
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
