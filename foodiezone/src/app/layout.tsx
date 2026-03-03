import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { OrderProvider } from '@/context/OrderContext'
import { ProfileProvider } from '@/context/ProfileContext'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FFFFFF',
}

export const metadata: Metadata = {
  title: 'Foodie Zone — Soweto Food Delivery',
  description: 'Burgers, Wings, Dagwoods & more. Delivered fast in Soweto.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Foodie Zone',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-ZA" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="font-body min-h-screen" style={{ background: '#FFFFFF', color: '#0A0A0A' }}>
        <AuthProvider>
          <ProfileProvider>
            <OrderProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </OrderProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
