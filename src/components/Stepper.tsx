type Props = {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}

export function Stepper({ label, value, onChange, min = 0, max = 10 }: Props) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ash px-4 py-3">
      <span className="text-base">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          aria-label="פחות"
          className="h-12 w-12 rounded-full border border-white/15 text-2xl active:bg-white/10 disabled:opacity-30"
          disabled={value <= min}
        >
          −
        </button>
        <span className="w-8 text-center text-xl font-bold tabular-nums">{value}</span>
        <button
          type="button"
          onClick={inc}
          aria-label="יותר"
          className="h-12 w-12 rounded-full border border-ember/60 bg-ember/15 text-2xl text-ember active:bg-ember/30 disabled:opacity-30"
          disabled={value >= max}
        >
          +
        </button>
      </div>
    </div>
  )
}
