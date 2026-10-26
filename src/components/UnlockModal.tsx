import { useState } from 'react'
import { strings } from '../strings'
import { checkUnlockCode } from '../api'

type Props = { onClose: () => void; onSuccess: () => void }

export function UnlockModal({ onClose, onSuccess }: Props) {
  const [code, setCode] = useState('')
  const [state, setState] = useState<'idle' | 'checking' | 'wrong' | 'error' | 'opening'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!code.trim() || state === 'checking' || state === 'opening') return
    setState('checking')
    try {
      const ok = await checkUnlockCode(code.trim())
      if (ok) {
        setState('opening')
        setTimeout(onSuccess, 900)
      } else {
        setState('wrong')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-4 sm:items-center" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl border border-blood/50 bg-ash p-6 text-center"
      >
        <div className={'mx-auto mb-3 w-16 text-blood ' + (state === 'wrong' ? 'shake' : state === 'opening' ? 'lock-break' : '')}>
          <svg viewBox="0 0 28 32" fill="none" aria-hidden="true" className="w-full">
            <path d="M8 13V9a6 6 0 0 1 12 0v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <rect x="3" y="13" width="22" height="17" rx="3" fill="currentColor" />
            <circle cx="14" cy="21" r="2.5" fill="#050505" />
          </svg>
        </div>
        <h2 className="title-creepy text-3xl text-blood">{strings.unlock.title}</h2>
        <p className="mt-2 text-sm text-bone/70">{strings.unlock.prompt}</p>

        <input
          inputMode="numeric"
          autoFocus
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            if (state === 'wrong') setState('idle')
          }}
          placeholder={strings.unlock.placeholder}
          className="mt-5 w-full rounded-xl border border-white/15 bg-ink px-4 py-4 text-center text-2xl tracking-[0.3em] outline-none focus:border-blood"
        />

        {state === 'wrong' && <p className="mt-3 text-sm text-blood">{strings.unlock.wrong}</p>}
        {state === 'error' && <p className="mt-3 text-sm text-blood">{strings.unlock.error}</p>}

        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/15 py-3">
            {strings.unlock.cancel}
          </button>
          <button
            type="submit"
            disabled={state === 'checking' || state === 'opening'}
            className="flex-1 rounded-xl bg-blood py-3 font-bold disabled:opacity-50"
          >
            {strings.unlock.submit}
          </button>
        </div>
      </form>
    </div>
  )
}
