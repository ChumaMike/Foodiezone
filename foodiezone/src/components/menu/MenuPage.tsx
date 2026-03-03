'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useProfile } from '@/context/ProfileContext'
import BottomNav from '@/components/BottomNav'
import MenuItemCard, { MenuItem } from './MenuItemCard'
import VariantModal from './VariantModal'
import CartBar from './CartBar'
import CheckoutScreen from './CheckoutScreen'
import CustomerSetupScreen from '@/components/auth/CustomerSetupScreen'

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
    description: 'Double up — 8 crispy golden fried full chicken wings.',
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
    description: 'Grilled wings — pick your flavour and double the feast.',
    price: 128,
    image: '/images/wings/fried-wings.png',
    category: 'Wingzz',
    badge: 'Best Value',
    hasFlavour: true,
  },
  {
    id: 'wings-mix',
    name: '2 Wings & 2 Drumsticks',
    description: 'Mixed pack — 2 fried full wings and 2 fried drumsticks.',
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
    description: 'The full load — chips, steak, cheese and bacon. Legendary.',
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

const PROMO_BANNERS = [
  {
    image: '/images/smash/smash-double.png',
    title: 'SMASHHH BURGERS',
    sub: 'From R95 — Double up for +R50',
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
  const { addItem } = useCart()
  const { role } = useAuth()
  const { hasProfile } = useProfile()
  const [activeCategory, setActiveCategory] = useState('Burgers')
  const [searchQuery, setSearchQuery] = useState('')
  const [variantItem, setVariantItem] = useState<MenuItem | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToastMessage = useCallback((name: string) => {
    setToast(name)
    setTimeout(() => setToast(null), 2800)
  }, [])

  const handleItemAdd = (item: MenuItem) => {
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
      showToastMessage(item.name)
    }
  }

  const handleVariantAdd = (displayName: string, _variant: string, _flavour: string, total: number) => {
    addItem({
      id: `${variantItem!.id}-${Date.now()}`,
      name: displayName,
      basePrice: variantItem!.price,
      addons: [],
      total,
    })
    showToastMessage(displayName)
    setVariantItem(null)
  }

  const filtered = searchQuery
    ? MENU_ITEMS.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : MENU_ITEMS.filter((i) => i.category === activeCategory)

  const popularItems = MENU_ITEMS.filter((i) => i.popular)

  return (
    <div className="min-h-screen pb-32" style={{ background: '#FFFFFF' }}>
      {/* Customer profile setup overlay */}
      {role === 'customer' && !hasProfile && <CustomerSetupScreen />}

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-5 left-1/2 z-[100] pointer-events-none animate-toast">
          <div
            className="text-white text-sm font-heading font-black px-4 py-2.5 flex items-center gap-2 whitespace-nowrap uppercase tracking-wide shadow-lg"
            style={{ background: '#0A0A0A', borderLeft: '3px solid #CC0000' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span>{toast} added</span>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-20" style={{ background: '#0A0A0A', borderBottom: '3px solid #CC0000' }}>
        <div className="max-w-md mx-auto px-4 pt-10 pb-3">

          {/* Location + rating row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <svg width="11" height="13" viewBox="0 0 11 13" fill="#888" xmlns="http://www.w3.org/2000/svg">
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

          {/* Brand */}
          <div className="brand-label mb-1">FOODIE ZONE</div>
          <h1 className="font-heading font-black text-white text-[30px] uppercase leading-none tracking-tight">
            The Menu
          </h1>
          <p className="text-[11px] font-body mt-0.5" style={{ color: '#666' }}>
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

      {/* ── Category tabs ── */}
      {!searchQuery && (
        <div
          className="sticky top-[160px] z-10 px-4 py-2"
          style={{ background: '#FFFFFF', borderBottom: '2px solid #0A0A0A' }}
        >
          <div className="flex gap-2 overflow-x-auto scrollbar-hide max-w-md mx-auto">
            {ORDERED_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-3.5 py-1.5 text-[12px] font-heading font-black uppercase tracking-wide transition-all duration-150"
                style={
                  activeCategory === cat
                    ? { background: '#CC0000', color: '#fff' }
                    : { background: '#F5F5F5', color: '#888', border: '1px solid #E5E5E5' }
                }
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4">

        {/* ── Promo banners ── */}
        {!searchQuery && activeCategory === 'Burgers' && (
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
                  <p className="font-heading font-black text-white text-[13px] leading-tight uppercase tracking-tight">{b.title}</p>
                  <p className="text-[11px] font-body mt-0.5 leading-tight" style={{ color: '#FF6B00' }}>{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Most Ordered ── */}
        {!searchQuery && activeCategory === 'Burgers' && (
          <div className="mt-5">
            <h2
              className="font-heading font-black text-[12px] uppercase tracking-[0.15em] mb-2.5"
              style={{ color: '#0A0A0A' }}
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
                  style={{ background: '#FFFFFF', border: '1px solid #E5E5E5', borderTop: '3px solid #CC0000' }}
                >
                  <div className="relative h-20">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, #CC0000, #0A0A0A)' }} />
                    )}
                  </div>
                  <div className="p-2">
                    <p className="font-heading font-black text-[10px] leading-tight line-clamp-2 uppercase" style={{ color: '#0A0A0A' }}>{item.name}</p>
                    <p className="font-heading font-black text-[11px] mt-1" style={{ color: '#FF6B00' }}>R{item.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Menu items list ── */}
        <div className="mt-4">
          {searchQuery ? (
            <>
              <p className="text-[11px] font-body mb-3" style={{ color: '#888' }}>
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
              </p>
              {filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="flex justify-center mb-3" style={{ color: '#CCC' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  </div>
                  <p className="font-heading font-black uppercase tracking-wide text-sm" style={{ color: '#0A0A0A' }}>Nothing found</p>
                  <p className="text-xs font-body mt-1" style={{ color: '#888' }}>Try a different search</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filtered.map((item) => (
                    <MenuItemCard key={item.id} item={item} onAdd={handleItemAdd} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Section heading */}
              <div className="mb-3 flex items-end justify-between">
                <div>
                  <h2
                    className="font-heading font-black text-[24px] uppercase leading-none tracking-tight"
                    style={{ color: '#0A0A0A' }}
                  >
                    {activeCategory}
                  </h2>
                  {activeCategory === 'Burgers' && (
                    <p className="text-[10px] font-heading font-black uppercase tracking-widest mt-0.5" style={{ color: '#CC0000' }}>
                      100% Beef &amp; Chicken
                    </p>
                  )}
                  {activeCategory === 'Smash Burgers' && (
                    <p className="text-[10px] font-heading font-black uppercase tracking-widest mt-0.5" style={{ color: '#CC0000' }}>
                      200g Hand-Pressed Patties
                    </p>
                  )}
                  {activeCategory === 'Wingzz' && (
                    <p className="text-[10px] font-heading font-black uppercase tracking-widest mt-0.5" style={{ color: '#1D4ED8' }}>
                      Fried · Dunked · Grilled
                    </p>
                  )}
                  {activeCategory === 'Chicken' && (
                    <p className="text-[10px] font-heading font-black uppercase tracking-widest mt-0.5" style={{ color: '#1D4ED8' }}>
                      Pick Your Flavour
                    </p>
                  )}
                </div>
                <span
                  className="text-[11px] font-heading font-black px-2 py-0.5 uppercase tracking-wide"
                  style={{ background: '#F5F5F5', color: '#888' }}
                >
                  {filtered.length} items
                </span>
              </div>
              <div className="space-y-2">
                {filtered.map((item) => (
                  <MenuItemCard key={item.id} item={item} onAdd={handleItemAdd} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="h-4" />
      </div>

      {/* ── Variant / Flavour modal ── */}
      {variantItem && (
        <VariantModal
          item={variantItem}
          onClose={() => setVariantItem(null)}
          onAddToCart={handleVariantAdd}
        />
      )}

      {/* ── Cart bar ── */}
      <CartBar onViewCart={() => setShowCheckout(true)} />

      {/* ── Checkout ── */}
      <CheckoutScreen show={showCheckout} onClose={() => setShowCheckout(false)} />

      <BottomNav />
    </div>
  )
}
