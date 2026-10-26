import { useState } from 'react'
import { strings } from '../strings'
import type { Rsvp } from '../types'
import { Stepper } from './Stepper'

type Props = {
  initial: Rsvp
  onSubmit: (rsvp: Rsvp) => void
  onBack: () => void
}

const s = strings.form

export function RsvpForm({ initial, onSubmit, onBack }: Props) {
  const [rsvp, setRsvp] = useState<Rsvp>(initial)
  const [errors, setErrors] = useState<string[]>([])

  const set = <K extends keyof Rsvp>(key: K, value: Rsvp[K]) => setRsvp((r) => ({ ...r, [key]: value }))

  function validate(): string[] {
    const errs: string[] = []
    if (!rsvp.adultName.trim()) errs.push(s.errors.nameRequired)
    const kids = rsvp.kids0to5 + rsvp.kids6to10 + rsvp.kids11to17
    const food = rsvp.hamburgersMeat + rsvp.hamburgersVeggie
    if (kids + food === 0) errs.push(s.errors.nothingSelected)
    return errs
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (errs.length === 0) onSubmit({ ...rsvp, adultName: rsvp.adultName.trim() })
  }

  return (
    <form onSubmit={submit} className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-6 px-4 py-6">
      <header className="flex items-center justify-between">
        <h1 className="title-creepy text-4xl text-ember">{s.title}</h1>
        <button type="button" onClick={onBack} className="text-sm text-bone/60">
          ←
        </button>
      </header>

      <label className="flex flex-col gap-2">
        <span className="font-medium">{s.adultName}</span>
        <input
          value={rsvp.adultName}
          onChange={(e) => set('adultName', e.target.value)}
          placeholder={s.adultNamePlaceholder}
          className="rounded-xl border border-white/15 bg-ash px-4 py-4 text-lg outline-none focus:border-ember"
        />
      </label>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-bold">{s.kidsTitle}</h2>
          <p className="text-sm text-bone/60">{s.kidsHint}</p>
        </div>
        <Stepper label={s.kids0to5} value={rsvp.kids0to5} onChange={(v) => set('kids0to5', v)} />
        <Stepper label={s.kids6to10} value={rsvp.kids6to10} onChange={(v) => set('kids6to10', v)} />
        <Stepper label={s.kids11to17} value={rsvp.kids11to17} onChange={(v) => set('kids11to17', v)} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{s.foodTitle}</h2>
        <Stepper label={s.hamburgerMeat} value={rsvp.hamburgersMeat} onChange={(v) => set('hamburgersMeat', v)} />
        <Stepper label={s.hamburgerVeggie} value={rsvp.hamburgersVeggie} onChange={(v) => set('hamburgersVeggie', v)} />
        <Stepper label={s.alcohol} value={rsvp.alcoholDrinkers} onChange={(v) => set('alcoholDrinkers', v)} />
      </section>

      {errors.length > 0 && (
        <ul className="rounded-xl border border-blood/50 bg-blood/10 px-4 py-3 text-sm text-blood">
          {errors.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="mt-auto rounded-2xl bg-ember py-5 text-xl font-bold text-ink shadow-[0_0_30px_rgba(255,106,0,0.45)] active:scale-[0.98]"
      >
        {s.submit}
      </button>
    </form>
  )
}
