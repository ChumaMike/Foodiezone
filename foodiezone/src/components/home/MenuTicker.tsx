'use client'

const ITEMS = [
  'Cheesey Smash Burger — R95',
  'Death by Bacon — R125',
  '5 Dunked Wings — R55',
  'Loaded Chips — R45',
  'Chicken Dagwood — R75',
  'Prego Roll — R65',
  'Chicken Wrap + Chips — R65',
  '10 Wings Combo — R99',
  'Grilled Chicken Meal — R85',
  'Double Smash — R115',
]

export default function MenuTicker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{ background: '#CC0000', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(0,0,0,0.2)' }}
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: 'ticker 32s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-heading font-black text-white uppercase text-sm tracking-widest flex-shrink-0 px-10"
            style={{ letterSpacing: '0.14em' }}
          >
            {item}
            <span className="mx-10 opacity-40">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
