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
        crimson:     '#CC0000',
        'fz-blue':   '#1D4ED8',
        'fz-navy':   '#0A1628',
        'fz-orange': '#FF6B00',
        'fz-surface':'#F5F5F5',
        'fz-card':   '#FFFFFF',
        'fz-border': '#E5E5E5',
        ink:         '#0A0A0A',
      },
      fontFamily: {
        display: ['var(--font-anton)',  'Impact', 'sans-serif'],
        heading: ['var(--font-barlow)', 'sans-serif'],
        body:    ['var(--font-nunito)', 'sans-serif'],
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)',
        'glow-red':   '0 0 24px rgba(204,0,0,0.35)',
      },
      maxWidth: {
        container: '72rem', // 1152px — consistent throughout
      },
    },
  },
  plugins: [],
}
