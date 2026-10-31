import { clues, hunt } from '../clues'
import { foundIds } from '../hunt'

// List of clues: found ones are tappable and show their text, missing ones are greyed.
export function HuntProgress({ onOpen }: { onOpen?: (id: number) => void }) {
  const found = foundIds()
  return (
    <div className="text-start">
      <p className="mb-2 text-sm text-bone/60">
        {hunt.foundLabel}: {found.length} / {clues.length}
      </p>
      <ul className="flex flex-col gap-2">
        {clues.map((c) => {
          const isFound = found.includes(c.id)
          return (
            <li key={c.id}>
              <button
                type="button"
                disabled={!isFound}
                onClick={() => onOpen?.(c.id) ?? (window.location.hash = `#/clue/${c.id}`)}
                className={
                  'flex w-full items-center justify-between rounded-xl border px-4 py-3 ' +
                  (isFound ? 'border-ember/50 bg-ember/10 text-bone' : 'border-white/10 text-bone/35')
                }
              >
                <span className="font-bold">{c.title}</span>
                <span className="text-sm">{isFound ? '✓' : hunt.missing}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
