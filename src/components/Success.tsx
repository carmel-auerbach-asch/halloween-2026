import { strings } from '../strings'
import type { Rsvp } from '../types'

type Props = { rsvp: Rsvp; onHome: () => void }

export function Success({ rsvp, onHome }: Props) {
  const t = strings.summary
  const rows: [string, string][] = [
    [t.adult, rsvp.adultName],
    [t.kids, rsvp.kidsAges.length ? rsvp.kidsAges.join(', ') : t.none],
    [t.meat, String(rsvp.hamburgersMeat)],
    [t.veggie, String(rsvp.hamburgersVeggie)],
    [t.candy, String(rsvp.candyBags)],
    [t.alcohol, String(rsvp.alcoholDrinkers)],
  ]

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-10 text-center">
      <div className="lantern-glow" />
      <h1 className="title-creepy relative z-10 text-5xl text-ember">{strings.success.title}</h1>
      <p className="relative z-10 mt-3 text-lg text-bone/80">{strings.success.subtitle}</p>

      <div className="relative z-10 mt-8 w-full max-w-sm rounded-2xl border border-white/10 bg-ash p-4 text-start">
        <h2 className="mb-3 text-sm text-bone/60">{strings.success.summaryTitle}</h2>
        <dl className="flex flex-col gap-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-bone/70">{k}</dt>
              <dd className="font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <button
        type="button"
        onClick={onHome}
        className="relative z-10 mt-8 w-full max-w-sm rounded-2xl border border-ember/60 py-4 text-ember"
      >
        {strings.success.backHome}
      </button>
    </div>
  )
}
