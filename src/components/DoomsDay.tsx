import { strings } from '../strings'

type Props = { onBack: () => void }

// Placeholder. Replace this component with the real party-time content.
export function DoomsDay({ onBack }: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="title-creepy text-6xl text-rot">{strings.doomsDay.title}</h1>
      <p className="mt-4 text-xl text-bone/70">{strings.doomsDay.body}</p>
      <button type="button" onClick={onBack} className="mt-10 rounded-2xl border border-white/20 px-8 py-3 text-bone/80">
        {strings.doomsDay.back}
      </button>
    </div>
  )
}
