import Navbar from '@/components/home/Navbar'
import HeroSection from '@/components/home/HeroSection'
import MenuTicker from '@/components/home/MenuTicker'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import FeaturedItems from '@/components/home/FeaturedItems'
import HowToOrder from '@/components/home/HowToOrder'
import PromoStrip from '@/components/home/PromoStrip'
import Testimonials from '@/components/home/Testimonials'
import Footer from '@/components/home/Footer'

export default function Home() {
  return (
    <main style={{ background: '#0A0A0A' }}>
      <Navbar />
      <HeroSection />
      <MenuTicker />
      <CategoryShowcase />
      <FeaturedItems />
      <HowToOrder />
      <PromoStrip />
      <Testimonials />
      <Footer />
    </main>
  )
}
