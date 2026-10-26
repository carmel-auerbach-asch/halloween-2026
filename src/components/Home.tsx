import { useState } from 'react'
import { strings } from '../strings'
import { UnlockModal } from './UnlockModal'

type Props = {
  unlocked: boolean
  soundOn: boolean
  onToggleSound: () => void
  onEnter: () => void
  onUnlocked: () => void
  onDoomsDay: () => void
}

export function Home({ unlocked, soundOn, onToggleSound, onEnter, onUnlocked, onDoomsDay }: Props) {
  const [showUnlock, setShowUnlock] = useState(false)

  return (
    <div className="home-bg relative flex min-h-dvh flex-col px-5 py-6">
      <button
        type="button"
        onClick={onToggleSound}
        className="relative z-10 self-start rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs text-bone/80 backdrop-blur"
      >
        {soundOn ? strings.home.soundOn : strings.home.soundOff}
      </button>

      <div className="relative z-10 flex flex-[1] flex-col items-center justify-center text-center">
        <h1 className="title-creepy text-6xl text-ember">{strings.partyTitle}</h1>
        {strings.partySubtitle && (
          <p className="mt-3 text-lg text-bone/85 [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]">{strings.partySubtitle}</p>
        )}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col gap-4">
        <button
          type="button"
          onClick={onEnter}
          className="btn-glow flex items-baseline justify-center gap-2 rounded-2xl bg-ember px-3 py-5 text-ink active:scale-[0.98]"
        >
          <span className="font-creepy text-3xl">{strings.home.enter}</span>
          <span className="text-xl font-bold">{strings.home.enterSub}</span>
        </button>

        <button
          type="button"
          onClick={() => (unlocked ? onDoomsDay() : setShowUnlock(true))}
          className={
            'btn-glow-red flex items-center justify-center gap-3 rounded-2xl py-5 text-ink active:scale-[0.98] ' +
            (unlocked ? 'bg-rot' : 'bg-blood')
          }
        >
          <LockIcon open={unlocked} />
          <span className="font-creepy text-3xl">{strings.home.doomsDay}</span>
        </button>
      </div>

      <div className="flex-[1.9]" />

      {showUnlock && (
        <UnlockModal
          onClose={() => setShowUnlock(false)}
          onSuccess={() => {
            setShowUnlock(false)
            onUnlocked()
            onDoomsDay()
          }}
        />
      )}
    </div>
  )
}

function LockIcon({ open }: { open: boolean }) {
  return (
    <svg width="30" height="34" viewBox="0 0 28 32" fill="none" aria-hidden="true">
      {open ? (
        <path d="M8 13V9a6 6 0 0 1 12 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform="rotate(-25 14 10)" />
      ) : (
        <path d="M8 13V9a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      )}
      <rect x="3" y="13" width="22" height="17" rx="3" fill="currentColor" />
      <circle cx="14" cy="21" r="2.5" fill="#050505" />
      <rect x="13" y="22" width="2" height="4" fill="#050505" />
    </svg>
  )
}
