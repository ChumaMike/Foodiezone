'use client'

import Image from 'next/image'
import { useState } from 'react'

const GALLERY_IMAGES = [
  // Burgers
  { src: '/images/catalogue/burgers/burger-1.png', category: 'Burgers' },
  { src: '/images/catalogue/burgers/burger-2.png', category: 'Burgers' },
  { src: '/images/catalogue/burgers/burger-3.png', category: 'Burgers' },
  { src: '/images/catalogue/burgers/burger-4.png', category: 'Burgers' },
  { src: '/images/catalogue/burgers/burger-5.png', category: 'Burgers' },
  { src: '/images/catalogue/burgers/burger-6.png', category: 'Burgers' },
  { src: '/images/catalogue/burgers/burger-7.png', category: 'Burgers' },
  { src: '/images/catalogue/burgers/burger-8.png', category: 'Burgers' },
  // Smash
  { src: '/images/catalogue/smash-burgers/smash-1.png', category: 'Smash Burgers' },
  { src: '/images/catalogue/smash-burgers/smash-2.png', category: 'Smash Burgers' },
  { src: '/images/catalogue/smash-burgers/smash-3.png', category: 'Smash Burgers' },
  // Wings
  { src: '/images/catalogue/wings/wings-1.png', category: 'Wingzz' },
  { src: '/images/catalogue/wings/wings-2.png', category: 'Wingzz' },
  { src: '/images/catalogue/wings/wings-3.png', category: 'Wingzz' },
  { src: '/images/catalogue/wings/wings-4.png', category: 'Wingzz' },
  { src: '/images/catalogue/wings/wings-5.png', category: 'Wingzz' },
  { src: '/images/catalogue/wings/wings-6.png', category: 'Wingzz' },
  { src: '/images/catalogue/wings/wings-7.png', category: 'Wingzz' },
  // Dagwoods
  { src: '/images/catalogue/dagwoods/dagwood-1.png', category: 'Dagwoods' },
  { src: '/images/catalogue/dagwoods/dagwood-2.png', category: 'Dagwoods' },
  { src: '/images/catalogue/dagwoods/dagwood-3.png', category: 'Dagwoods' },
  { src: '/images/catalogue/dagwoods/dagwood-4.png', category: 'Dagwoods' },
  { src: '/images/catalogue/dagwoods/dagwood-5.png', category: 'Dagwoods' },
  { src: '/images/catalogue/dagwoods/dagwood-6.png', category: 'Dagwoods' },
  { src: '/images/catalogue/dagwoods/dagwood-7.png', category: 'Dagwoods' },
  { src: '/images/catalogue/dagwoods/dagwood-8.png', category: 'Dagwoods' },
  // Loaded Chips
  { src: '/images/catalogue/loaded-chips/loaded-1.png', category: 'Loaded Chips' },
  { src: '/images/catalogue/loaded-chips/loaded-2.png', category: 'Loaded Chips' },
  { src: '/images/catalogue/loaded-chips/loaded-3.png', category: 'Loaded Chips' },
  { src: '/images/catalogue/loaded-chips/loaded-4.png', category: 'Loaded Chips' },
  { src: '/images/catalogue/loaded-chips/loaded-5.png', category: 'Loaded Chips' },
  // Prego
  { src: '/images/catalogue/prego-roll/prego-1.png', category: 'Prego Rolls' },
  { src: '/images/catalogue/prego-roll/prego-2.png', category: 'Prego Rolls' },
  // Wraps
  { src: '/images/catalogue/wraps/wrap-1.png', category: 'Wraps' },
  { src: '/images/catalogue/wraps/wrap-2.png', category: 'Wraps' },
  { src: '/images/catalogue/wraps/wrap-3.png', category: 'Wraps' },
  { src: '/images/catalogue/wraps/wrap-4.png', category: 'Wraps' },
  { src: '/images/catalogue/wraps/wrap-5.png', category: 'Wraps' },
  { src: '/images/catalogue/wraps/wrap-6.png', category: 'Wraps' },
  { src: '/images/catalogue/wraps/wrap-7.png', category: 'Wraps' },
  { src: '/images/catalogue/wraps/wrap-8.png', category: 'Wraps' },
  // Chicken
  { src: '/images/catalogue/grilled-chicken/chicken-1.png', category: 'Chicken' },
  { src: '/images/catalogue/grilled-chicken/chicken-2.png', category: 'Chicken' },
  { src: '/images/catalogue/grilled-chicken/chicken-3.png', category: 'Chicken' },
  { src: '/images/catalogue/grilled-chicken/chicken-4.png', category: 'Chicken' },
]

const FILTERS = ['All', 'Burgers', 'Smash Burgers', 'Wingzz', 'Dagwoods', 'Loaded Chips', 'Prego Rolls', 'Wraps', 'Chicken']

export default function GalleryPage() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const filtered = active === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((i) => i.category === active)

  return (
    <div className="min-h-screen pt-24 pb-20 px-5" style={{ background: '#0A0A0A' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-3" style={{ color: '#CC0000' }}>
            Foodie Zone
          </p>
          <h1 className="font-heading font-black text-white uppercase text-5xl md:text-7xl leading-none tracking-tight">
            THE FOOD<br />
            <span style={{ color: '#CC0000' }}>SPEAKS FOR ITSELF</span>
          </h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="text-[11px] font-heading font-black uppercase tracking-widest px-4 py-2 transition-all"
              style={active === f
                ? { background: '#CC0000', color: '#fff' }
                : { border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((img, i) => (
            <div
              key={`${img.src}-${i}`}
              className="break-inside-avoid relative overflow-hidden cursor-pointer group"
              onClick={() => setLightbox(img.src)}
              style={{ background: '#1A1A1A' }}
            >
              <Image
                src={img.src}
                alt={img.category}
                width={400}
                height={400}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: 'rgba(10,10,10,0.5)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ background: 'rgba(10,10,10,0.8)' }}>
                <p className="text-[10px] font-heading font-black uppercase tracking-widest" style={{ color: '#CC0000' }}>
                  {img.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 p-2 text-white/60 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <div className="relative max-w-2xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightbox}
              alt="Food"
              width={800}
              height={800}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
