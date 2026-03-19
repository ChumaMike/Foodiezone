import type { Metadata, Viewport } from 'next'
import { Anton, Barlow, Nunito_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { OrderProvider } from '@/context/OrderContext'
import { ProfileProvider } from '@/context/ProfileContext'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nunito',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0A0A0A',
}

export const metadata: Metadata = {
  title: 'Foodie Zone — Real Food. Real Fast. Soweto',
  description: 'Premium burgers, wings, dagwoods, grilled chicken & more. Delivered hot and fast in Orlando East, Soweto. Order online now.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Foodie Zone — Real Food. Real Fast.',
    description: 'Burgers, Wings, Dagwoods & Grilled Chicken. Delivered fast in Soweto.',
    siteName: 'Foodie Zone',
    locale: 'en_ZA',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Foodie Zone',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${anton.variable} ${barlow.variable} ${nunitoSans.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="font-body min-h-screen" style={{ background: '#0A0A0A', color: '#FFFFFF' }}>
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
