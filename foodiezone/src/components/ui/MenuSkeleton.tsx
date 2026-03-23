export default function MenuSkeleton() {
  return (
    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden animate-pulse"
          style={{ background: '#1C1C1C', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {/* Image placeholder */}
          <div className="w-full" style={{ aspectRatio: '4/3', background: '#2a2a2a' }} />
          {/* Content placeholder */}
          <div className="p-3.5 space-y-2">
            <div className="h-3 rounded" style={{ background: '#333', width: '70%' }} />
            <div className="h-2 rounded" style={{ background: '#2a2a2a', width: '90%' }} />
            <div className="h-2 rounded" style={{ background: '#2a2a2a', width: '60%' }} />
            <div className="flex items-center justify-between mt-3">
              <div className="h-5 w-10 rounded" style={{ background: '#333' }} />
              <div className="h-7 w-14 rounded" style={{ background: '#333' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
