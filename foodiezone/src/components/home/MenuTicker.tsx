'use client'

const ITEMS = [
  'Cheesey Smash Burger · R95',
  'Death by Bacon · R125',
  '5 Dunked Wings · R55',
  'Loaded Chips · R45',
  'Chicken Dagwood · R75',
  'Prego Roll · R65',
  'Chicken Wrap + Chips · R65',
  '10 Wings Combo · R99',
  'Grilled Chicken Meal · R85',
  'Double Smash · R115',
]

export default function MenuTicker() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div
      className="overflow-hidden py-4 select-none"
      style={{
        background: '#131312',
        borderTop: '3px solid #131312',
        borderBottom: '3px solid #131312',
      }}
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: 'ticker 32s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-heading font-extrabold uppercase text-sm flex-shrink-0 px-10"
            style={{ color: '#FFF8EC', letterSpacing: '0.14em' }}
          >
            {item}
            <span className="mx-10" style={{ color: '#FF7A1A' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
