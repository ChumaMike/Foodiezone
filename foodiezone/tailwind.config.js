/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─── Kasi-bright brand palette ──────────────────────────────
        brand: {
          bg:       '#FFF8EC', // warm cream
          ink:      '#131312', // near-black
          mango:    '#FF7A1A', // primary CTA
          yellow:   '#FFD43B', // warm-up accent
          magenta:  '#FF3D8C', // zing / tags
          emerald:  '#11A66A', // fresh / success
          electric: '#2A6BFF', // info / link
          charcoal: '#2A2A2A', // secondary surface
          sand:     '#F5E9CC', // tonal cream
        },

        // ─── Shadcn-compatible semantic aliases ─────────────────────
        primary:   '#FF7A1A', // mango
        secondary: '#FF3D8C', // magenta
        accent:    '#2A6BFF', // electric
        ink:       '#131312',
        cream:     '#FFF8EC',

        // ─── Backwards-compat aliases (old red-on-black world) ──────
        // Kept so any straggler reference still resolves; remapped to
        // the new bright palette so the page never looks broken.
        crimson:      '#FF7A1A', // mango replaces crimson
        'fz-blue':    '#2A6BFF',
        'fz-navy':    '#FFF8EC', // old "page bg" → cream
        'fz-orange':  '#FF7A1A',
        'fz-surface': '#F5E9CC',
        'fz-card':    '#FFFFFF',
        'fz-border':  '#EADFC4',
      },
      fontFamily: {
        display: ['var(--font-anton)',  'Impact', 'sans-serif'],
        heading: ['var(--font-barlow)', 'sans-serif'],
        body:    ['var(--font-nunito)', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(19,19,18,0.08), 0 1px 2px rgba(19,19,18,0.04)',
        'card-hover': '0 8px 24px rgba(19,19,18,0.12), 0 3px 6px rgba(19,19,18,0.06)',
        'glow-mango': '0 0 24px rgba(255,122,26,0.45)',
        'glow-red':   '0 0 24px rgba(255,122,26,0.45)', // alias
        'kasi':       '6px 6px 0 0 #131312',
      },
      maxWidth: {
        container: '72rem',
      },
    },
  },
  plugins: [],
}
