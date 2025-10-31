import './globals.css'
import { CartProvider } from '@/context/CartContext'
import ClientNav from '@/components/ClientNav'

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
      <body className="font-sans">
        <CartProvider>
          <ClientNav />
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
        </CartProvider>
      </body>
    </html>
  )
}
