import Navbar from '@/components/home/Navbar'
import Footer from '@/components/home/Footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About — Foodie Zone',
  description: 'The story behind Foodie Zone. Real food from the heart of Soweto.',
}

export default function About() {
  return (
    <main style={{ background: '#0A0A0A' }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/catalogue/smash-burgers/smash-1.png"
            alt="Smash Burger"
            fill
            className="object-cover"
            style={{ filter: 'brightness(0.15)' }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#CC0000' }}>
            Our story
          </p>
          <h1 className="font-heading font-black text-white uppercase leading-none tracking-tight mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            BORN IN<br /><span style={{ color: '#CC0000' }}>SOWETO</span>
          </h1>
          <p className="font-body text-lg leading-relaxed max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
            From the streets of Orlando East to your door — Foodie Zone is more than just a takeaway.
            It&apos;s real food, made with heart, delivered with speed.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <Image
              src="/images/catalogue/burgers/burger-2.png"
              alt="Our burgers"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-heading font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#CC0000' }}>
              Who we are
            </p>
            <h2 className="font-heading font-black text-white uppercase text-4xl leading-none tracking-tight mb-6">
              NO SHORTCUTS.<br />JUST REAL FOOD.
            </h2>
            <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              <p>
                Foodie Zone started with a simple belief: people in Soweto deserve restaurant-quality food
                without the restaurant prices. We hand-press every patty, marinate every wing, and build
                every dagwood fresh — no frozen shortcuts.
              </p>
              <p>
                Based in Orlando East, we serve the community we grew up in. Every order is a promise:
                hot food, fast delivery, and flavour that hits different.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { value: '8+', label: 'Menu Categories' },
                { value: '4.8★', label: 'Customer Rating' },
                { value: '25min', label: 'Avg Delivery' },
              ].map((s) => (
                <div key={s.label} className="text-center p-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="font-heading font-black text-white text-2xl">{s.value}</div>
                  <div className="font-body text-xs mt-1 uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 text-center" style={{ background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <h2 className="font-heading font-black text-white uppercase text-4xl md:text-5xl leading-none tracking-tight mb-6">
          HUNGRY?<br /><span style={{ color: '#CC0000' }}>ORDER NOW.</span>
        </h2>
        <Link
          href="/menu"
          className="inline-block font-heading font-black uppercase tracking-widest px-10 py-4 text-base transition-all hover:brightness-110"
          style={{ background: '#CC0000', color: '#fff' }}
        >
          SEE THE MENU →
        </Link>
      </section>

      {/* Built by */}
      <div className="text-center py-6" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <a
          href="https://skhokholabs.xyz"
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading font-black text-xs uppercase tracking-widest transition-colors hover:text-white"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Built by <span style={{ color: '#CC0000' }}>skhokholabs.xyz</span>
        </a>
      </div>

      <Footer />
    </main>
  )
}
