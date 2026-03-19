'use client'

import Image from 'next/image'
import Link from 'next/link'

const FEATURED = [
  {
    name: 'Cheesey Smash Burger',
    desc: '200g smash patty, melted cheddar. Served with chips.',
    price: 95,
    badge: 'Best Seller',
    image: '/images/smash/smash-double.png',
    badgeColor: '#CC0000',
  },
  {
    name: '5 Dunked Wings',
    desc: 'Wings tossed in our signature sauce. Sticky, saucy, irresistible.',
    price: 55,
    badge: 'Popular',
    image: '/images/wings/dunked-wings.png',
    badgeColor: '#FF6B00',
  },
  {
    name: 'Death by Bacon',
    desc: '200g smash patty, cheddar, triple bacon. Go big or go home.',
    price: 125,
    badge: 'Fan Favourite',
    image: '/images/smash/smash-double.png',
    badgeColor: '#0A0A0A',
  },
  {
    name: 'Chicken Wrap + Chips',
    desc: 'Chicken strips, lettuce, gherkins, creamy & signature sauces. With chips.',
    price: 65,
    badge: 'Popular',
    image: '/images/wraps/chicken-wrap.png',
    badgeColor: '#1D4ED8',
  },
]

export default function FeaturedItems() {
  return (
    <section className="py-20 px-5" style={{ background: '#111111' }}>
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-heading font-bold text-xs uppercase tracking-[0.3em] mb-2" style={{ color: '#FF6B00' }}>
              Most ordered
            </p>
            <h2 className="font-heading font-bold text-white uppercase text-4xl md:text-5xl leading-none tracking-tight">
              FAN FAVES
            </h2>
          </div>
          <Link
            href="/menu"
            className="hidden sm:block text-sm font-heading font-bold uppercase tracking-widest px-5 py-2.5 transition-all hover:brightness-110"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
          >
            Full Menu →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED.map((item) => (
            <Link
              href="/menu"
              key={item.name}
              className="group flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1"
              style={{ background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ height: 200 }}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.6) 0%, transparent 60%)' }} />
                {/* Badge */}
                <span
                  className="absolute top-3 left-3 text-[10px] font-heading font-bold uppercase tracking-wide px-2.5 py-1"
                  style={{ background: item.badgeColor, color: '#fff' }}
                >
                  {item.badge}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-heading font-bold text-white uppercase text-sm leading-snug tracking-tight mb-1">
                  {item.name}
                </h3>
                <p className="font-body text-xs leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {item.desc}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-heading font-bold text-lg" style={{ color: '#FF6B00' }}>
                    R{item.price}
                  </span>
                  <span
                    className="text-xs font-heading font-bold uppercase tracking-widest px-3 py-1.5 transition-colors"
                    style={{ background: '#CC0000', color: '#fff' }}
                  >
                    + Add
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile full menu link */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/menu"
            className="inline-block text-sm font-heading font-bold uppercase tracking-widest px-8 py-3"
            style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)' }}
          >
            Full Menu →
          </Link>
        </div>
      </div>
    </section>
  )
}
