import { useEffect, useRef, useState } from 'react'
import { strings } from '../strings'

type Props = {
  soundOn: boolean
  sending: boolean
  onConfirm: () => void
  onReconsider: () => void
}

// Replace these two files in /public to change the clip.
const VIDEO_SRC = '/skeleton.mp4'
const POSTER_SRC = '/skeleton-poster.jpg'
// Fallback reveal time if the browser never fires "ended" (ms).
const FALLBACK_MS = 6000

export function Scare({ soundOn, sending, onConfirm, onReconsider }: Props) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [ready, setReady] = useState(reduced)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (reduced) return
    const v = videoRef.current
    if (!v) return
    v.muted = !soundOn
    v.play().catch(() => {
      // Autoplay with sound can be blocked; retry muted so the scare still plays.
      v.muted = true
      v.play().catch(() => setReady(true))
    })
    const fallback = setTimeout(() => setReady(true), FALLBACK_MS)
    return () => clearTimeout(fallback)
  }, [reduced, soundOn])

  return (
    <div className="relative min-h-dvh overflow-hidden bg-black">
      {reduced ? (
        <img src={POSTER_SRC} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          playsInline
          preload="auto"
          onEnded={() => setReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div
        className={
          'absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 bg-gradient-to-t from-black via-black/85 to-transparent px-4 pb-10 pt-28 text-center transition-opacity duration-700 ' +
          (ready ? 'opacity-100' : 'pointer-events-none opacity-0')
        }
      >
        <h2 className="title-creepy text-4xl text-blood">{strings.scare.question}</h2>
        <button
          type="button"
          disabled={sending || !ready}
          onClick={onConfirm}
          className="w-full max-w-sm rounded-2xl bg-blood py-5 text-xl font-bold disabled:opacity-60"
        >
          {sending ? strings.scare.sending : strings.scare.yes}
        </button>
        <button
          type="button"
          disabled={sending || !ready}
          onClick={onReconsider}
          className="w-full max-w-sm rounded-2xl border border-white/20 py-4 text-bone/80 disabled:opacity-60"
        >
          {strings.scare.reconsider}
        </button>
      </div>
    </div>
  )
}
