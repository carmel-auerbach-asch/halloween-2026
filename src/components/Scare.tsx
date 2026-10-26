import { useEffect, useRef, useState } from 'react'
import { strings } from '../strings'

type Props = {
  soundOn: boolean
  sending: boolean
  onConfirm: () => void
  onReconsider: () => void
}

// Replace /zombie.svg with your own image (png/jpg/gif) in /public and update ZOMBIE_SRC.
const ZOMBIE_SRC = '/zombie.svg'
// Optional sound: drop a file at /public/growl.mp3. If missing, nothing plays.
const GROWL_SRC = '/growl.mp3'

export function Scare({ soundOn, sending, onConfirm, onReconsider }: Props) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [phase, setPhase] = useState<'run' | 'zoom'>(reduced ? 'zoom' : 'run')
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setPhase('zoom'), 1700)
    return () => clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (!soundOn || reduced) return
    const audio = new Audio(GROWL_SRC)
    audioRef.current = audio
    audio.volume = 0.8
    audio.play().catch(() => {})
    return () => {
      audio.pause()
    }
  }, [soundOn, reduced])

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black">
      <img
        src={ZOMBIE_SRC}
        alt=""
        className={'absolute left-1/2 top-1/2 w-[80vw] max-w-[420px] ' + (phase === 'run' ? 'zombie-run' : 'zombie-zoom')}
      />

      {phase === 'zoom' && (
        <div className="fade-in-late absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 bg-gradient-to-t from-black via-black/90 to-transparent px-4 pb-10 pt-24 text-center">
          <h2 className="title-creepy text-4xl text-blood">{strings.scare.question}</h2>
          <button
            type="button"
            disabled={sending}
            onClick={onConfirm}
            className="w-full max-w-sm rounded-2xl bg-blood py-5 text-xl font-bold disabled:opacity-60"
          >
            {sending ? strings.scare.sending : strings.scare.yes}
          </button>
          <button
            type="button"
            disabled={sending}
            onClick={onReconsider}
            className="w-full max-w-sm rounded-2xl border border-white/20 py-4 text-bone/80 disabled:opacity-60"
          >
            {strings.scare.reconsider}
          </button>
        </div>
      )}
    </div>
  )
}
