import { useEffect, useState } from 'react'
import { strings } from '../strings'
import { HuntProgress } from './HuntProgress'

// Drop your recorded instructions at /public/instructions.mp3 (or .m4a and change the name here).
const AUDIO_SRC = '/instructions.mp3'

// Opening page of the event. Shown automatically when the countdown hits zero.
export function EventStart() {
  const [flash, setFlash] = useState(true)

  useEffect(() => {
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 600])
    const t = setTimeout(() => setFlash(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-black px-4 py-10 text-center">
      {flash && <div className="flash-red pointer-events-none absolute inset-0 bg-blood" />}
      <div className="lantern-glow" />

      <h1 className="title-creepy relative z-10 mt-6 text-7xl text-blood">{strings.doomsDay.startTitle}</h1>
      <p className="relative z-10 mt-6 max-w-sm whitespace-pre-line text-base leading-relaxed text-bone/90">
        {strings.doomsDay.startBody}
      </p>

      <div className="relative z-10 mt-8 w-full max-w-sm rounded-2xl border border-ember/40 bg-ash/80 p-4">
        <p className="mb-3 text-sm text-ember">{strings.doomsDay.audioLabel}</p>
        <audio controls preload="auto" src={AUDIO_SRC} className="w-full" />
      </div>

      <div className="relative z-10 mt-8 w-full max-w-sm">
        <HuntProgress />
      </div>
    </div>
  )
}
