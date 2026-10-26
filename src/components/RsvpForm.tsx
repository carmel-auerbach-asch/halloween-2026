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
    const anyCount =
      rsvp.hamburgersMeat + rsvp.hamburgersVeggie + rsvp.candyBags + rsvp.alcoholDrinkers > 0
    if (!anyCount && rsvp.kidsAges.length === 0) errs.push(s.errors.nothingSelected)
    if (rsvp.kidsAges.some((a) => Number.isNaN(a) || a < 0 || a > 18)) errs.push(s.errors.ageRange)
    return errs
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (errs.length === 0) onSubmit({ ...rsvp, adultName: rsvp.adultName.trim(), phone: rsvp.phone.trim() })
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

      <label className="flex flex-col gap-2">
        <span className="font-medium">{s.phone}</span>
        <input
          inputMode="tel"
          value={rsvp.phone}
          onChange={(e) => set('phone', e.target.value)}
          className="rounded-xl border border-white/15 bg-ash px-4 py-4 text-lg outline-none focus:border-ember"
          dir="ltr"
        />
      </label>

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-bold">{s.kidsTitle}</h2>
          <p className="text-sm text-bone/60">{s.kidsHint}</p>
        </div>
        {rsvp.kidsAges.map((age, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-ash px-4 py-3">
            <span className="text-sm text-bone/70">{s.kidAge}</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={18}
              value={Number.isNaN(age) ? '' : age}
              onChange={(e) => {
                const next = [...rsvp.kidsAges]
                next[i] = e.target.value === '' ? NaN : Number(e.target.value)
                set('kidsAges', next)
              }}
              className="w-20 rounded-lg border border-white/15 bg-ink px-3 py-2 text-center text-lg outline-none focus:border-ember"
            />
            <button
              type="button"
              onClick={() => set('kidsAges', rsvp.kidsAges.filter((_, j) => j !== i))}
              className="ms-auto text-sm text-blood"
            >
              {s.removeKid}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => set('kidsAges', [...rsvp.kidsAges, 8])}
          className="rounded-xl border border-dashed border-ember/50 py-3 text-ember"
        >
          + {s.addKid}
        </button>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-bold">{s.foodTitle}</h2>
        <Stepper label={s.hamburgerMeat} value={rsvp.hamburgersMeat} onChange={(v) => set('hamburgersMeat', v)} />
        <Stepper label={s.hamburgerVeggie} value={rsvp.hamburgersVeggie} onChange={(v) => set('hamburgersVeggie', v)} />
        <Stepper label={s.candyBags} value={rsvp.candyBags} onChange={(v) => set('candyBags', v)} />
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
