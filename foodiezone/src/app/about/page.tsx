import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import AboutContent from '@/components/about/AboutContent'

export const metadata = {
  title: 'About — Foodie Zone',
  description: 'The story behind Foodie Zone. Real food from the heart of Soweto.',
}

export default function About() {
  return (
    <main style={{ background: '#0A0A0A' }}>
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  )
}
