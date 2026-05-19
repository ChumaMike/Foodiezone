import Navbar from '@/components/home/Navbar'
import HeroSection from '@/components/home/HeroSection'
import MenuTicker from '@/components/home/MenuTicker'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import FoodMosaic from '@/components/home/FoodMosaic'
import FoodDividerStrip from '@/components/home/FoodDividerStrip'
import AppetiteStatement from '@/components/home/AppetiteStatement'
import FeaturedItems from '@/components/home/FeaturedItems'
import FoodQuality from '@/components/home/FoodQuality'
import FoodWall from '@/components/home/FoodWall'
import Footer from '@/components/home/Footer'

const DIVIDER_1 = [
  { src: '/images/catalogue/smash-burgers/smash-2.png', label: 'Smash Burger',    price: 95,  badgeColor: '#FFD43B' },
  { src: '/images/catalogue/wings/wings-1.png',          label: 'Dunked Wings',   price: 55,  badgeColor: '#FF3D8C' },
  { src: '/images/catalogue/loaded-chips/loaded-3.png',  label: 'Loaded Chips',   price: 45,  badgeColor: '#FF7A1A' },
]

const DIVIDER_2 = [
  { src: '/images/catalogue/dagwoods/dagwood-3.png',     label: 'Chicken Dagwood', price: 75, badgeColor: '#FFD43B' },
  { src: '/images/catalogue/burgers/burger-5.png',       label: 'Beef Burger',     price: 70, badgeColor: '#FF7A1A' },
  { src: '/images/catalogue/wraps/wrap-2.png',           label: 'Chicken Wrap',    price: 65, badgeColor: '#FF3D8C' },
]

const DIVIDER_3 = [
  { src: '/images/catalogue/grilled-chicken/chicken-2.png', label: 'Grilled Chicken', price: 85,  badgeColor: '#11A66A' },
  { src: '/images/catalogue/prego-roll/prego-2.png',        label: 'Prego Roll',       price: 65,  badgeColor: '#FFD43B' },
  { src: '/images/catalogue/smash-burgers/smash-3.png',     label: 'Double Smash',     price: 115, badgeColor: '#FF3D8C' },
]

export default function Home() {
  return (
    <main style={{ background: '#FFF8EC' }}>
      <Navbar />
      <HeroSection />
      <MenuTicker />
      <FoodMosaic />
      <CategoryShowcase />
      <FoodDividerStrip items={DIVIDER_1} />
      <AppetiteStatement />
      <FoodDividerStrip items={DIVIDER_2} />
      <FoodQuality />
      <FeaturedItems />
      <FoodDividerStrip items={DIVIDER_3} />
      <FoodWall />
      <Footer />
    </main>
  )
}
