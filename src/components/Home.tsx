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
    <div className="relative flex min-h-dvh flex-col items-center justify-between px-4 py-10">
      <div className="lantern-glow" />

      <button
        type="button"
        onClick={onToggleSound}
        className="relative z-10 self-start rounded-full border border-white/15 px-3 py-1 text-xs text-bone/70"
      >
        {soundOn ? strings.home.soundOn : strings.home.soundOff}
      </button>

      <div className="relative z-10 flex flex-col items-center text-center">
        <LanternIcon />
        <h1 className="title-creepy mt-6 text-5xl text-ember">{strings.partyTitle}</h1>
        <p className="mt-3 max-w-xs text-bone/70">{strings.partySubtitle}</p>
      </div>

      <div className="relative z-10 flex w-full max-w-sm flex-col gap-4">
        <button
          type="button"
          onClick={onEnter}
          className="rounded-2xl bg-ember py-5 text-xl font-bold text-ink shadow-[0_0_30px_rgba(255,106,0,0.45)] active:scale-[0.98]"
        >
          {strings.home.enter}
        </button>

        <button
          type="button"
          onClick={() => (unlocked ? onDoomsDay() : setShowUnlock(true))}
          className={
            'flex items-center justify-center gap-3 rounded-2xl border py-5 text-xl font-bold active:scale-[0.98] ' +
            (unlocked
              ? 'border-rot/60 bg-rot/10 text-rot'
              : 'border-blood/60 bg-blood/10 text-blood')
          }
        >
          <LockIcon open={unlocked} />
          <span className="title-creepy text-2xl">{strings.home.doomsDay}</span>
        </button>
      </div>

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

function LanternIcon() {
  return (
    <svg width="96" height="120" viewBox="0 0 96 120" fill="none" aria-hidden="true">
      <rect x="40" y="4" width="16" height="10" rx="2" fill="#3a3a3a" />
      <path d="M20 22h56l8 14v56l-8 14H20l-8-14V36z" fill="#1c1c1c" stroke="#4a4a4a" strokeWidth="2" />
      <path d="M26 30h44l4 8v50l-4 8H26l-4-8V38z" fill="#2a1a08" />
      <ellipse cx="48" cy="68" rx="14" ry="20" fill="#ff6a00" opacity="0.9">
        <animate attributeName="ry" values="20;17;21;18;20" dur="2.6s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="48" cy="72" rx="7" ry="11" fill="#ffd27a" />
      <rect x="30" y="106" width="36" height="8" rx="2" fill="#3a3a3a" />
    </svg>
  )
}

function LockIcon({ open }: { open: boolean }) {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden="true">
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
