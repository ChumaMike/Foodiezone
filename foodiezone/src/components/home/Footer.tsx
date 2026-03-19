'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-3">
              FOODIE<span style={{ color: '#CC0000' }}>ZONE</span>
            </div>
            <p className="font-body text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Burgers, Wings, Dagwoods & more.<br />
              Real food, made fresh, delivered fast.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/27000000000"
                className="p-2.5 transition-colors hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.5)">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.122 1.528 5.856L0 24l6.307-1.507A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 0 1-4.988-1.364l-.357-.212-3.745.895.938-3.63-.233-.374A9.786 9.786 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="p-2.5 transition-colors hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="rgba(255,255,255,0.5)" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-black text-xs uppercase tracking-[0.2em] mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Order Now', href: '/menu' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'About Us', href: '/about' },
                { label: 'Login', href: '/login' },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-heading font-black text-sm uppercase tracking-wide transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.4)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-heading font-black text-xs uppercase tracking-[0.2em] mb-5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Find Us
            </h4>
            <ul className="space-y-3 font-body text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <li>10681 Bhele St, Pimville</li>
              <li>Gauteng, South Africa, 1809</li>
              <li>Mon – Sun: 10:00 – 22:00</li>
              <li>
                <a href="https://wa.me/27000000000" className="hover:text-white transition-colors" style={{ color: '#25D366' }}>
                  WhatsApp us →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © {new Date().getFullYear()} Foodie Zone. All rights reserved.
          </p>
          <a
            href="https://skhokholabs.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading font-black text-xs uppercase tracking-widest transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Built by <span style={{ color: '#CC0000' }}>skhokholabs.xyz</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
