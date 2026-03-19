import Navbar from '@/components/home/Navbar'
import HeroSection from '@/components/home/HeroSection'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import FeaturedItems from '@/components/home/FeaturedItems'
import PromoStrip from '@/components/home/PromoStrip'
import Footer from '@/components/home/Footer'

export default function Home() {
  return (
    <main style={{ background: '#0A0A0A' }}>
      <Navbar />
      <HeroSection />
      <CategoryShowcase />
      <FeaturedItems />
      <PromoStrip />
      <Footer />
    </main>
  )
}
