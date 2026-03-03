'use client'

const STEPS = [
  { label: 'Confirmed' },
  { label: 'Preparing' },
  { label: 'Ready'     },
  { label: 'On the Way'},
]

interface OrderStepperProps {
  step: number
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

export default function OrderStepper({ step }: OrderStepperProps) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E5E5E5' }}>
      {/* Top accent */}
      <div className="h-1" style={{ background: '#CC0000' }} />

      <div className="p-4">
        <p className="font-heading font-black text-[11px] uppercase tracking-[0.15em] mb-4" style={{ color: '#888' }}>
          Order Progress
        </p>

        <div className="relative flex items-start justify-between">
          {/* Track bg */}
          <div className="absolute top-5 left-5 right-5 h-0.5" style={{ background: '#E5E5E5' }} />

          {/* Filled track */}
          <div
            className="absolute top-5 left-5 h-0.5 transition-all duration-700 ease-in-out"
            style={{ width: `calc(${(step / (STEPS.length - 1)) * 100}% - 10px)`, background: '#CC0000' }}
          />

          {STEPS.map((s, idx) => {
            const done   = idx <= step
            const active = idx === step
            const past   = idx < step
            return (
              <div key={s.label} className="flex flex-col items-center gap-1.5 z-10 flex-1">
                <div
                  className={`w-10 h-10 flex items-center justify-center transition-all duration-500 ${active ? 'scale-110' : ''}`}
                  style={{
                    background: done ? '#CC0000' : '#F5F5F5',
                    boxShadow: active ? '0 0 0 4px rgba(204,0,0,0.15)' : 'none',
                    border: done ? 'none' : '1px solid #E5E5E5',
                  }}
                >
                  {past ? (
                    <CheckIcon />
                  ) : active ? (
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#fff' }} />
                  ) : (
                    <span className="font-heading font-black text-[13px]" style={{ color: '#CCC' }}>
                      {idx + 1}
                    </span>
                  )}
                </div>
                <p
                  className="text-[10px] font-heading font-black uppercase tracking-wide text-center leading-tight transition-colors"
                  style={{ color: active ? '#CC0000' : done ? '#0A0A0A' : '#CCC' }}
                >
                  {s.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
