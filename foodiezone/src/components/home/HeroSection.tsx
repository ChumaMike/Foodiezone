'use client'

import Link from 'next/link'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.3)' }}
      >
        <source src="/videos/wings.mp4" type="video/mp4" />
        <source src="/videos/smash-burgers.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.2) 0%, transparent 40%, rgba(10,10,10,0.85) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">

        {/* Live badge */}
        <div
          className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5"
          style={{ background: 'rgba(204,0,0,0.12)', border: '1px solid rgba(204,0,0,0.35)' }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: '#CC0000', boxShadow: '0 0 6px #CC0000', animation: 'pulseDot 1.4s ease-in-out infinite' }}
          />
          <span
            className="font-heading font-semibold text-xs uppercase"
            style={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '0.18em' }}
          >
            Free delivery · R100+ · 25–35 min
          </span>
        </div>

        {/* Headline — Anton, two clean breakpoints */}
        <h1
          className="font-display text-white leading-none mb-6"
          style={{ fontSize: 'clamp(4.5rem, 13vw, 9rem)', letterSpacing: '0.01em' }}
        >
          REAL FOOD.<br />
          <span style={{ color: '#CC0000' }}>REAL FAST.</span>
        </h1>

        {/* Sub */}
        <p
          className="font-body text-lg mb-10 max-w-md mx-auto"
          style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, lineHeight: 1.7 }}
        >
          Burgers · Wings · Dagwoods · Chicken<br />
          <span style={{ color: '#FF6B00', fontWeight: 500 }}>Pimville, Soweto</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/menu"
            className="font-heading font-bold text-sm uppercase tracking-widest px-10 py-4 w-full sm:w-auto text-center transition-all hover:brightness-110 active:scale-95"
            style={{ background: '#CC0000', color: '#fff', letterSpacing: '0.15em', minWidth: 200 }}
          >
            Order Now
          </Link>
          <Link
            href="/gallery"
            className="font-heading font-semibold text-sm uppercase tracking-widest px-10 py-4 w-full sm:w-auto text-center transition-all hover:bg-white hover:text-black"
            style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', minWidth: 200 }}
          >
            See The Food
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-12 mt-16">
          {[
            { value: '4.8', unit: '★', label: 'Rating' },
            { value: '25', unit: 'min', label: 'Avg delivery' },
            { value: '8', unit: '+', label: 'Categories' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-white" style={{ fontSize: 32, letterSpacing: '0.02em' }}>
                {s.value}<span style={{ color: '#CC0000', fontSize: 22 }}>{s.unit}</span>
              </div>
              <div
                className="font-heading font-semibold text-xs uppercase mt-1"
                style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="font-heading text-xs text-white uppercase" style={{ letterSpacing: '0.2em' }}>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </section>
  )
}
