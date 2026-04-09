export function SkeletonGrid() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5"
        >
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-2xl bg-white/10" />
            <div className="h-6 w-20 rounded-full bg-white/10" />
          </div>
          <div className="mt-8 h-10 w-3/4 rounded-2xl bg-white/10" />
          <div className="mt-5 flex items-center justify-between">
            <div className="h-8 w-24 rounded-full bg-white/10" />
            <div className="h-5 w-20 rounded-full bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  )
}
