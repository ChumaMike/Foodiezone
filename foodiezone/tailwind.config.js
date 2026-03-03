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
        // Street culture palette
        crimson:     '#CC0000',   // primary red
        'fz-blue':   '#1D4ED8',   // street blue
        'fz-navy':   '#0A1628',   // deep navy
        'fz-orange': '#FF6B00',   // price / highlight orange
        'fz-surface':'#F5F5F5',   // light card bg
        'fz-card':   '#FFFFFF',   // card white
        'fz-border': '#E5E5E5',   // subtle border
        ink:         '#0A0A0A',   // near-black text
      },
      fontFamily: {
        heading: ['var(--font-syne)',    'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
