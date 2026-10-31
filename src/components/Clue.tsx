import { useEffect, useState } from 'react'
import { clues, hunt } from '../clues'
import { markFound } from '../hunt'
import { eventTime, formatRemaining } from '../time'
import { HuntProgress } from './HuntProgress'

type Props = { id: number; onBack: () => void }

export function Clue({ id, onBack }: Props) {
  const clue = clues.find((c) => c.id === id)
  const unlockAt = clue?.availableFrom ? eventTime(clue.availableFrom) : 0
  const [now, setNow] = useState(Date.now())
  const locked = unlockAt > now

  useEffect(() => {
    if (!locked) return
    const t = setInterval(() => setNow(Date.now()), 500)
    return () => clearInterval(t)
  }, [locked])

  useEffect(() => {
    if (clue && !locked) markFound(clue.id)
  }, [clue, locked])

  return (
    <div className="relative flex min-h-dvh flex-col items-center px-4 py-10 text-center">
      <div className="lantern-glow" />

      {!clue ? (
        <p className="relative z-10 mt-20 text-xl text-blood">{hunt.notFound}</p>
      ) : locked ? (
        <>
          <h1 className="title-creepy relative z-10 mt-10 text-5xl text-blood">{hunt.lockedTitle}</h1>
          <p className="relative z-10 mt-4 text-lg text-bone/70">
            {hunt.lockedBody} {clue.availableFrom}
          </p>
          <div dir="ltr" className="relative z-10 mt-4 font-creepy text-6xl text-ember tabular-nums">
            {formatRemaining(unlockAt - now)}
          </div>
        </>
      ) : (
        <>
          <h1 className="title-creepy relative z-10 mt-10 text-5xl text-ember">{clue.title}</h1>
          <div className="relative z-10 mt-8 w-full max-w-sm rounded-2xl border border-ember/40 bg-ash/80 p-6">
            <p className="whitespace-pre-line text-2xl leading-relaxed text-bone">{clue.text}</p>
          </div>
        </>
      )}

      <div className="relative z-10 mt-10 w-full max-w-sm">
        <HuntProgress />
      </div>

      <button
        type="button"
        onClick={onBack}
        className="relative z-10 mt-8 rounded-2xl border border-white/20 px-8 py-3 text-bone/60"
      >
        {hunt.backToHunt}
      </button>
    </div>
  )
}
