import { useEffect, useState } from 'react'
import { strings } from '../strings'
import { EventStart } from './EventStart'
import { eventTime, formatRemaining } from '../time'

type Props = { onBack: () => void }

// The moment the event begins, Israel time on the event day.
const START_AT = '18:15'
const TARGET_MS = eventTime(START_AT)

function remainingMs(): number {
  return Math.max(0, TARGET_MS - Date.now())
}

export function DoomsDay({ onBack }: Props) {
  const [left, setLeft] = useState(remainingMs)

  useEffect(() => {
    const id = setInterval(() => setLeft(remainingMs()), 250)
    return () => clearInterval(id)
  }, [])

  if (left <= 0) return <EventStart />

  const urgent = left <= 60_000

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-8 text-center">
      <div className="lantern-glow" />
      <h1 className="title-creepy relative z-10 text-5xl text-blood">{strings.doomsDay.title}</h1>

      <h2 className="relative z-10 mt-6 text-2xl font-bold leading-snug text-ember">{strings.doomsDay.question}</h2>
      <p className="relative z-10 mt-4 max-w-xs whitespace-pre-line text-base leading-relaxed text-bone/85">
        {strings.doomsDay.story}
      </p>

      <p className="relative z-10 mt-8 text-sm text-bone/60">{strings.doomsDay.countdownLabel}</p>
      <div
        dir="ltr"
        className={
          'relative z-10 mt-1 font-creepy tabular-nums tracking-wider ' +
          (urgent ? 'countdown-pulse text-6xl text-blood' : 'text-5xl text-ember')
        }
      >
        {formatRemaining(left)}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="relative z-10 mt-8 rounded-2xl border border-white/20 px-8 py-2.5 text-sm text-bone/60"
      >
        {strings.doomsDay.back}
      </button>
    </div>
  )
}
