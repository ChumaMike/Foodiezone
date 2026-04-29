'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useProfile } from '@/context/ProfileContext'
import { useToast } from '@/context/ToastContext'
import BottomNav from '@/components/BottomNav'
import MenuItemCard, { MenuItem } from './MenuItemCard'
import VariantModal from './VariantModal'
import CartBar from './CartBar'
import CheckoutScreen from './CheckoutScreen'
import CustomerSetupScreen from '@/components/auth/CustomerSetupScreen'
import { staggerContainer, fadeUp, slideInRight } from '@/lib/motion'

const MENU_ITEMS: MenuItem[] = [
  // ── Traditional Burgers ────────────────────────────────────────────
  {
    id: 'burg-beef-classic',
    name: 'Beef Classic Burger',
    description: 'Beef patty, cheese, lettuce, caramelised onions, BBQ & creamy sauce. Served with chips.',
    price: 60,
    image: '/images/burgers/beef-burger.png',
    category: 'Burgers',
    badge: 'Popular',
    popular: true,
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'burg-beef-bacon',
    name: 'Beef Bacon Burger',
    description: 'Beef patty, bacon, cheese, lettuce, caramelised onions, BBQ & creamy sauce. With chips.',
    price: 70,
    image: '/images/burgers/beef-burger.png',
    category: 'Burgers',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'burg-beef-bacon-egg',
    name: 'Beef Bacon & Egg Burger',
    description: 'Beef patty, bacon, fried egg, cheese, lettuce, caramelised onions, BBQ sauce. With chips.',
    price: 75,
    image: '/images/burgers/beef-burger.png',
    category: 'Burgers',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'burg-chick-classic',
    name: 'Chicken Classic Burger',
    description: 'Chicken patty, cheese, lettuce, gherkins, creamy sauce. Served with chips.',
    price: 55,
    image: '/images/burgers/chicken-burger.png',
    category: 'Burgers',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'burg-chick-bacon',
    name: 'Chicken Bacon Burger',
    description: 'Chicken patty, bacon, cheese, lettuce, gherkins, creamy sauce. Served with chips.',
    price: 65,
    image: '/images/burgers/chicken-burger.png',
    category: 'Burgers',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'burg-chick-bacon-egg',
    name: 'Chicken Bacon & Egg Burger',
    description: 'Chicken patty, bacon, fried egg, cheese, lettuce, gherkins, creamy sauce. With chips.',
    price: 70,
    image: '/images/burgers/chicken-burger.png',
    category: 'Burgers',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  // ── Smash Burgers ──────────────────────────────────────────────────
  {
    id: 'smash-cheesey',
    name: 'Cheesey Smash Burger',
    description: '200g smash patty, melted cheddar. Served with chips.',
    price: 95,
    image: '/images/smash/smash-double.png',
    category: 'Smash Burgers',
    badge: 'Best Seller',
    popular: true,
    hasVariant: true,
    doublePriceExtra: 50,
  },
  {
    id: 'smash-jalapeno',
    name: 'Jalapeño Feast',
    description: '200g smash patty, cheddar, jalapeños. A fiery classic. With chips.',
    price: 105,
    image: '/images/smash/smash-double.png',
    category: 'Smash Burgers',
    badge: 'Spicy 🌶️',
    hasVariant: true,
    doublePriceExtra: 50,
  },
  {
    id: 'smash-shroomsss',
    name: 'Shroomsss',
    description: '200g smash patty, cheddar, grilled mushrooms. Earthy & bold. With chips.',
    price: 110,
    image: '/images/smash/smash-single.png',
    category: 'Smash Burgers',
    hasVariant: true,
    doublePriceExtra: 50,
  },
  {
    id: 'smash-death-bacon',
    name: 'Death by Bacon',
    description: '200g smash patty, cheddar, triple bacon. Go big or go home. With chips.',
    price: 125,
    image: '/images/smash/smash-double.png',
    category: 'Smash Burgers',
    badge: 'Popular',
    hasVariant: true,
    doublePriceExtra: 50,
  },
  // ── Dagwoods ───────────────────────────────────────────────────────
  {
    id: 'dag-chick',
    name: 'Chicken Dagwood',
    description: 'Toasted bread, lettuce, cheese, chicken patty. Served with chips.',
    price: 45,
    image: '/images/dagwoods/dagwood-loaded.png',
    category: 'Dagwoods',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'dag-chick-egg',
    name: 'Egg & Chicken Dagwood',
    description: 'Toasted bread, lettuce, cheese, chicken patty, fried egg. With chips.',
    price: 50,
    image: '/images/dagwoods/dagwood-loaded.png',
    category: 'Dagwoods',
    hasVariant: true,
    doublePriceExtra: 25,
  },
  {
    id: 'dag-chick-bacon',
    name: 'Bacon Chicken Dagwood',
    description: 'Toasted bread, lettuce, cheese, chicken patty, crispy bacon. With chips.',
    price: 55,
    image: '/images/dagwoods/dagwood-loaded.png',
    category: 'Dagwoods',
    badge: 'Popular',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'dag-chick-bacon-egg',
    name: 'Egg & Bacon Chicken Dagwood',
    description: 'Toasted bread, lettuce, cheese, chicken patty, bacon, fried egg. With chips.',
    price: 60,
    image: '/images/dagwoods/dagwood-loaded.png',
    category: 'Dagwoods',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  {
    id: 'dag-beef',
    name: 'Beef Dagwood',
    description: 'Toasted bread, lettuce, cheese, beef patty. Served with chips.',
    price: 50,
    image: '/images/dagwoods/dagwood-beef.png',
    category: 'Dagwoods',
    hasVariant: true,
    doublePriceExtra: 25,
  },
  {
    id: 'dag-beef-bacon',
    name: 'Bacon Beef Dagwood',
    description: 'Toasted bread, lettuce, cheese, beef patty, crispy bacon. With chips.',
    price: 60,
    image: '/images/dagwoods/dagwood-beef.png',
    category: 'Dagwoods',
    hasVariant: true,
    doublePriceExtra: 25,
  },
  {
    id: 'dag-beef-signature',
    name: 'Signature Beef Dagwood',
    description: 'Toasted bread, lettuce, cheese, beef patty, topped with our signature sauce. With chips.',
    price: 55,
    image: '/images/dagwoods/dagwood-beef.png',
    category: 'Dagwoods',
    badge: 'Best Seller',
    hasVariant: true,
    doublePriceExtra: 20,
  },
  // ── Wingzz ─────────────────────────────────────────────────────────
  {
    id: 'wings-fried-4',
    name: '4 Fried Full Wings',
    description: 'Crispy golden fried full chicken wings. A Foodie Zone staple.',
    price: 48,
    image: '/images/wings/fried-wings.png',
    category: 'Wingzz',
    popular: true,
  },
  {
    id: 'wings-fried-8',
    name: '8 Fried Full Wings',
    description: 'Double up. 8 crispy golden fried full chicken wings.',
    price: 96,
    image: '/images/wings/fried-wings.png',
    category: 'Wingzz',
    badge: 'Best Value',
  },
  {
    id: 'wings-drum-4',
    name: '4 Fried Drumsticks',
    description: 'Juicy, golden-fried chicken drumsticks. Perfect finger food.',
    price: 56,
    image: '/images/wings/fried-wings.png',
    category: 'Wingzz',
  },
  {
    id: 'wings-dunked-5',
    name: '5 Dunked Wings',
    description: 'Wings tossed in our signature sauce. Sticky, saucy, irresistible.',
    price: 55,
    image: '/images/wings/dunked-wings.png',
    category: 'Wingzz',
    badge: 'Popular',
  },
  {
    id: 'wings-dunked-10',
    name: '10 Dunked Wings',
    description: '10 wings tossed in our signature sauce. Share (or don\'t).',
    price: 105,
    image: '/images/wings/dunked-wings.png',
    category: 'Wingzz',
    badge: 'Best Value',
  },
  {
    id: 'wings-grilled-4',
    name: '4 Grilled Wings',
    description: 'Grilled wings with your choice of flavour. Choose below.',
    price: 64,
    image: '/images/wings/fried-wings.png',
    category: 'Wingzz',
    hasFlavour: true,
  },
  {
    id: 'wings-grilled-8',
    name: '8 Grilled Wings',
    description: 'Grilled wings, pick your flavour and double the feast.',
    price: 128,
    image: '/images/wings/fried-wings.png',
    category: 'Wingzz',
    badge: 'Best Value',
    hasFlavour: true,
  },
  {
    id: 'wings-mix',
    name: '2 Wings & 2 Drumsticks',
    description: 'Mixed pack. 2 fried full wings and 2 fried drumsticks.',
    price: 52,
    image: '/images/wings/fried-wings.png',
    category: 'Wingzz',
  },
  // ── Loaded Chips ───────────────────────────────────────────────────
  {
    id: 'chips-cheesy',
    name: 'Cheesy Chips',
    description: 'Crispy chips loaded with melted cheese sauce.',
    price: 35,
    image: '/images/loaded/cheesy-chips.png',
    category: 'Loaded Chips',
    popular: true,
  },
  {
    id: 'chips-bacon',
    name: 'Bacon Chips',
    description: 'Crispy chips topped with salty crispy bacon bits.',
    price: 35,
    image: '/images/loaded/bacon-chips.png',
    category: 'Loaded Chips',
  },
  {
    id: 'chips-bacon-cheesy',
    name: 'Bacon Cheesy Chips',
    description: 'Chips loaded with melted cheese and crispy bacon.',
    price: 45,
    image: '/images/loaded/bacon-chips.png',
    category: 'Loaded Chips',
    badge: 'Popular',
  },
  {
    id: 'chips-jalapeno-cheesy',
    name: 'Jalapeño Cheesy Chips',
    description: 'Chips, melted cheese and sliced jalapeños. Hot & cheesy.',
    price: 45,
    image: '/images/loaded/cheesy-chips.png',
    category: 'Loaded Chips',
    badge: 'Spicy 🌶️',
  },
  {
    id: 'chips-steak',
    name: 'Steak Chips',
    description: 'Crispy chips topped with sliced steak strips.',
    price: 55,
    image: '/images/loaded/cheesy-chips.png',
    category: 'Loaded Chips',
  },
  {
    id: 'chips-steak-bacon',
    name: 'Steak & Bacon Chips',
    description: 'Chips with steak strips and crispy bacon.',
    price: 67,
    image: '/images/loaded/bacon-chips.png',
    category: 'Loaded Chips',
  },
  {
    id: 'chips-steak-cheesy',
    name: 'Cheesy Steak Chips',
    description: 'Chips, steak strips and melted cheese sauce.',
    price: 70,
    image: '/images/loaded/cheesy-chips.png',
    category: 'Loaded Chips',
    badge: 'Best Seller',
  },
  {
    id: 'chips-steak-all',
    name: 'Steak Cheesy & Bacon Chips',
    description: 'The full load: chips, steak, cheese and bacon. Legendary.',
    price: 80,
    image: '/images/loaded/bacon-chips.png',
    category: 'Loaded Chips',
    badge: 'Best Value',
    popular: true,
  },
  // ── Prego Rolls ────────────────────────────────────────────────────
  {
    id: 'prego-chick',
    name: 'Chicken Prego Roll',
    description: 'Grilled chicken fillet in a soft roll with prego sauce.',
    price: 42,
    image: '/images/prego/prego-rolls.png',
    category: 'Prego Rolls',
  },
  {
    id: 'prego-chick-chips',
    name: 'Chicken Prego Roll + Chips',
    description: 'Grilled chicken fillet prego roll, served with a side of chips.',
    price: 57,
    image: '/images/prego/prego-rolls.png',
    category: 'Prego Rolls',
    badge: 'Popular',
    popular: true,
  },
  {
    id: 'prego-steak',
    name: 'Steak Prego Roll',
    description: 'Tender steak strips in a soft roll with prego sauce.',
    price: 47,
    image: '/images/prego/prego-rolls.png',
    category: 'Prego Rolls',
  },
  {
    id: 'prego-steak-chips',
    name: 'Steak Prego Roll + Chips',
    description: 'Tender steak prego roll, served with a side of chips.',
    price: 62,
    image: '/images/prego/prego-rolls.png',
    category: 'Prego Rolls',
    badge: 'Best Value',
  },
  // ── Wraps & Salads ─────────────────────────────────────────────────
  {
    id: 'wrap-chicken',
    name: 'Chicken Wrap + Chips',
    description: 'Chicken strips, lettuce, gherkins, Foodie creamy & signature sauces in a warm wrap. With chips.',
    price: 65,
    image: '/images/wraps/chicken-wrap.png',
    category: 'Wraps & Salads',
    badge: 'Popular',
    popular: true,
  },
  {
    id: 'wrap-beef',
    name: 'Beef Wrap + Chips',
    description: 'Steak strips, grilled red onions, lettuce, carrots in a warm wrap. Served with chips.',
    price: 75,
    image: '/images/wraps/chicken-wrap.png',
    category: 'Wraps & Salads',
    badge: 'Best Seller',
  },
  {
    id: 'salad-green',
    name: 'Regular Green Salad',
    description: 'Fresh garden greens with house dressing.',
    price: 25,
    category: 'Wraps & Salads',
  },
  {
    id: 'salad-chick',
    name: 'Chicken Strips Green Salad',
    description: 'Fresh greens topped with crispy chicken strips and house dressing.',
    price: 45,
    image: '/images/wraps/chicken-wrap.png',
    category: 'Wraps & Salads',
  },
  {
    id: 'salad-steak',
    name: 'Steak Strips Green Salad',
    description: 'Fresh greens topped with tender steak strips and house dressing.',
    price: 50,
    category: 'Wraps & Salads',
  },
  // ── Grilled Chicken ────────────────────────────────────────────────
  {
    id: 'chick-quarter',
    name: 'Quarter Leg + Chips',
    description: 'Grilled quarter chicken leg with a side of chips. Choose your flavour.',
    price: 50,
    image: '/images/chicken/grilled.png',
    category: 'Chicken',
    hasFlavour: true,
    popular: true,
  },
  {
    id: 'chick-quarter-plate',
    name: 'Quarter Plate Special',
    description: 'Soft pap, grilled quarter leg, 2 sides of your choice. Pick your flavour.',
    price: 60,
    image: '/images/chicken/meal.png',
    category: 'Chicken',
    badge: 'Best Value',
    hasFlavour: true,
  },
  {
    id: 'chick-half',
    name: 'Half Chicken + Chips',
    description: 'Grilled half chicken with a side of chips. Choose your flavour.',
    price: 80,
    image: '/images/chicken/grilled.png',
    category: 'Chicken',
    badge: 'Popular',
    hasFlavour: true,
  },
  {
    id: 'chick-half-plate',
    name: 'Half Plate Special',
    description: 'Soft pap, grilled half chicken, 2 sides of your choice. Pick your flavour.',
    price: 85,
    image: '/images/chicken/meal.png',
    category: 'Chicken',
    badge: 'Best Value',
    hasFlavour: true,
  },
  {
    id: 'chick-full',
    name: 'Full Chicken',
    description: 'A whole grilled chicken. Pick your flavour.',
    price: 125,
    image: '/images/chicken/grilled.png',
    category: 'Chicken',
    hasFlavour: true,
  },
  {
    id: 'chick-full-chips',
    name: 'Full Chicken + Medium Chips',
    description: 'Whole grilled chicken with a medium side of chips. Pick your flavour.',
    price: 155,
    image: '/images/chicken/meal.png',
    category: 'Chicken',
    hasFlavour: true,
  },
  {
    id: 'chick-full-pap',
    name: 'Full Chicken + Large Pap',
    description: 'Whole grilled chicken with large soft pap. Pick your flavour.',
    price: 155,
    image: '/images/chicken/meal.png',
    category: 'Chicken',
    hasFlavour: true,
  },
]

const ORDERED_CATEGORIES = [
  'Burgers',
  'Smash Burgers',
  'Dagwoods',
  'Wingzz',
  'Loaded Chips',
  'Prego Rolls',
  'Wraps & Salads',
  'Chicken',
]

const CATEGORY_LABELS: Record<string, string> = {
  'Burgers':       'Burgers',
  'Smash Burgers': 'Smash',
  'Dagwoods':      'Dagwoods',
  'Wingzz':        'Wingzz',
  'Loaded Chips':  'Loaded',
  'Prego Rolls':   'Prego',
  'Wraps & Salads':'Wraps',
  'Chicken':       'Chicken',
}

const CATEGORY_META: Record<string, { hero: string; accent: string; sub: string }> = {
  'Burgers':       { hero: '/images/catalogue/burgers/burger-1.png',             accent: '#CC0000', sub: '100% Beef & Chicken' },
  'Smash Burgers': { hero: '/images/catalogue/smash-burgers/smash-1.png',        accent: '#CC0000', sub: '200g Hand-Pressed Patties' },
  'Dagwoods':      { hero: '/images/catalogue/dagwoods/dagwood-1.png',           accent: '#1D4ED8', sub: 'Loaded & Toasted' },
  'Wingzz':        { hero: '/images/catalogue/wings/wings-1.png',                accent: '#FF6B00', sub: 'Fried · Dunked · Grilled' },
  'Loaded Chips':  { hero: '/images/catalogue/loaded-chips/loaded-1.png',        accent: '#FF6B00', sub: 'Loaded with the Good Stuff' },
  'Prego Rolls':   { hero: '/images/catalogue/prego-roll/prego-1.png',           accent: '#1D4ED8', sub: 'Soft Rolls, Big Flavour' },
  'Wraps & Salads':{ hero: '/images/catalogue/wraps/wrap-1.png',                 accent: '#1D4ED8', sub: 'Fresh & Flavourful' },
  'Chicken':       { hero: '/images/catalogue/grilled-chicken/chicken-1.png',    accent: '#CC0000', sub: 'Pick Your Flavour' },
}

const PROMO_BANNERS = [
  {
    image: '/images/smash/smash-double.png',
    title: 'SMASHHH BURGERS',
    sub: 'From R95. Double up for +R50',
  },
  {
    gradient: 'linear-gradient(135deg, #CC0000, #7A0000)',
    title: 'Free Delivery R100+',
    sub: '3 km radius · Fast & hot',
  },
  {
    image: '/images/wings/dunked-wings.png',
    title: 'WINGZZ',
    sub: 'Dunked, Fried & Grilled',
  },
]

export default function MenuPage() {
  const { addItem, count } = useCart()
  const { role } = useAuth()
  const { hasProfile } = useProfile()
  const { show: showToast } = useToast()
  const [activeCategory, setActiveCategory] = useState('Burgers')
  const [searchQuery, setSearchQuery] = useState('')
  const [variantItem, setVariantItem] = useState<MenuItem | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat)
  }, [])

  const handleItemAdd = useCallback((item: MenuItem) => {
    if (item.hasVariant || item.hasFlavour) {
      setVariantItem(item)
    } else {
      addItem({
        id: `${item.id}-${Date.now()}`,
        name: item.name,
        basePrice: item.price,
        addons: [],
        total: item.price,
      })
      showToast(`${item.name} added`)
    }
  }, [addItem, showToast])

  const handleVariantAdd = useCallback((displayName: string, _variant: string, _flavour: string, total: number) => {
    addItem({
      id: `${variantItem!.id}-${Date.now()}`,
      name: displayName,
      basePrice: variantItem!.price,
      addons: [],
      total,
    })
    showToast(`${displayName} added`)
    setVariantItem(null)
  }, [addItem, showToast, variantItem])

  const filtered = searchQuery
    ? MENU_ITEMS.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : MENU_ITEMS.filter((i) => i.category === activeCategory)

  const popularItems = MENU_ITEMS.filter((i) => i.popular)
  const meta = CATEGORY_META[activeCategory]

  return (
    <div className="min-h-screen pb-32" style={{ background: '#111111' }}>
      {/* Customer profile setup overlay */}
      {role === 'customer' && !hasProfile && <CustomerSetupScreen />}

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-20" style={{ background: '#0A0A0A', borderBottom: '3px solid #CC0000' }}>
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-3">
          {/* Location + rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <svg width="11" height="13" viewBox="0 0 11 13" fill="#888">
                <path d="M5.5 0C2.46 0 0 2.46 0 5.5c0 4.125 5.5 7.5 5.5 7.5S11 9.625 11 5.5C11 2.46 8.54 0 5.5 0z"/>
                <circle cx="5.5" cy="5.5" r="2" fill="white"/>
              </svg>
              <span className="text-xs font-body font-medium" style={{ color: '#888' }}>Orlando East, Soweto</span>
            </div>
            <div
              className="flex items-center gap-1 px-2.5 py-1"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs font-body font-semibold text-white">4.8</span>
              <span className="text-xs mx-1" style={{ color: '#444' }}>·</span>
              <span className="text-xs font-body" style={{ color: '#888' }}>25–35 min</span>
            </div>
          </div>

          {/* Brand + title */}
          <div className="brand-label mb-1">FOODIE ZONE</div>
          <h1 className="font-display text-white uppercase leading-none" style={{ fontSize: 34 }}>
            The Menu
          </h1>
          <p className="font-body text-xs mt-1" style={{ color: '#666', fontWeight: 400 }}>
            Burgers · Wings · Dagwoods · Chicken
          </p>

          {/* Search */}
          <div className="relative mt-3">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: '#555' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu…"
              className="w-full pl-9 pr-4 py-2.5 text-sm font-body text-white focus:outline-none transition-colors"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            />
          </div>
        </div>
      </header>

      {/* ── Category Pills ── */}
      {!searchQuery && (
        <div
          className="sticky top-[172px] z-10 py-2.5"
          style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 max-w-6xl mx-auto">
            {ORDERED_CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.93 }}
                onClick={() => handleCategoryChange(cat)}
                className="relative shrink-0 px-3.5 py-1.5 text-[11px] font-heading font-semibold uppercase"
                style={{
                  color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.1em',
                  background: 'transparent',
                  transition: 'color 0.15s',
                }}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="cat-active-pill"
                    className="absolute inset-0"
                    style={{ background: '#CC0000' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {activeCategory !== cat && (
                  <span
                    className="absolute inset-0"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  />
                )}
                <span className="relative z-10">{CATEGORY_LABELS[cat]}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4">

        {/* ── Search results ── */}
        {searchQuery ? (
          <div className="mt-5">
            <p className="text-[11px] font-body mb-4" style={{ color: '#888' }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
            </p>
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <div className="flex justify-center mb-3" style={{ color: '#555' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <p className="font-heading font-bold uppercase tracking-wide text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Nothing found</p>
                <p className="text-xs font-body mt-1" style={{ color: '#666' }}>Try a different search</p>
              </div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {filtered.map((item) => (
                  <motion.div key={item.id} variants={fadeUp}>
                    <MenuItemCard item={item} onAdd={handleItemAdd} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        ) : (
          <>
            {/* ── Category Hero ── */}
            <AnimatePresence mode="wait">
            {meta && (
              <motion.div
                key={activeCategory}
                variants={slideInRight}
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative overflow-hidden -mx-4"
                style={{ height: 'clamp(160px, 30vw, 260px)' }}
              >
                <Image
                  src={meta.hero}
                  alt={activeCategory}
                  fill
                  className="object-cover"
                  style={{ filter: 'brightness(0.45)' }}
                  sizes="100vw"
                  priority
                />
                {/* Left-to-right gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 50%, transparent 100%)' }}
                />
                {/* Bottom fade */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.8) 0%, transparent 60%)' }}
                />
                {/* Text */}
                <div className="absolute inset-0 flex items-end px-4 pb-5">
                  <div>
                    <p
                      className="font-heading font-bold uppercase text-[10px] tracking-[0.2em] mb-1"
                      style={{ color: meta.accent }}
                    >
                      {meta.sub}
                    </p>
                    <h2 className="font-display uppercase leading-none text-white" style={{ fontSize: 'clamp(36px, 8vw, 56px)' }}>
                      {activeCategory}
                    </h2>
                    <p className="font-heading font-bold text-[11px] uppercase tracking-[0.15em] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {filtered.length} items
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            {/* ── Promo banners (Burgers only) ── */}
            {activeCategory === 'Burgers' && (
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pt-4 pb-1 -mx-4 px-4">
                {PROMO_BANNERS.map((b) => (
                  <div
                    key={b.title}
                    className="shrink-0 w-52 overflow-hidden relative"
                    style={{ height: 88 }}
                  >
                    {b.image ? (
                      <Image src={b.image} alt={b.title} fill className="object-cover brightness-50" />
                    ) : (
                      <div className="absolute inset-0" style={{ background: b.gradient }} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-center">
                      <p className="font-heading font-bold text-white text-[13px] leading-tight uppercase tracking-tight">{b.title}</p>
                      <p className="text-[11px] font-body mt-0.5 leading-tight" style={{ color: '#FF6B00' }}>{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Most Ordered (Burgers only) ── */}
            {activeCategory === 'Burgers' && (
              <div className="mt-5">
                <h2
                  className="font-heading font-semibold text-[11px] uppercase mb-2.5"
                  style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em' }}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2.5 h-2.5 inline-block" style={{ background: '#CC0000' }} />
                    Most Ordered
                  </span>
                </h2>
                <div className="flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
                  {popularItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleItemAdd(item)}
                      className="shrink-0 w-28 overflow-hidden text-left active:scale-95 transition-all duration-150"
                      style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.08)', borderTop: '2px solid #CC0000' }}
                    >
                      <div className="relative h-20">
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #CC0000, #0A0A0A)' }} />
                        )}
                      </div>
                      <div className="p-2">
                        <p className="font-heading font-semibold text-[10px] leading-tight line-clamp-2 uppercase" style={{ color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em' }}>{item.name}</p>
                        <p className="font-display text-[13px] mt-1 leading-none" style={{ color: '#FF6B00' }}>R{item.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Items Grid ── */}
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    layout
                  >
                    <MenuItemCard item={item} onAdd={handleItemAdd} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        <div className="h-8" />
      </div>

      {/* ── Variant / Flavour modal ── */}
      <AnimatePresence>
        {variantItem && (
          <VariantModal
            item={variantItem}
            onClose={() => setVariantItem(null)}
            onAddToCart={handleVariantAdd}
          />
        )}
      </AnimatePresence>

      {/* ── Cart bar ── */}
      <AnimatePresence>
        {count > 0 && <CartBar onViewCart={() => setShowCheckout(true)} />}
      </AnimatePresence>

      {/* ── Checkout ── */}
      <CheckoutScreen show={showCheckout} onClose={() => setShowCheckout(false)} />

      <BottomNav />
    </div>
  )
}
