import { strings } from '../strings'

type Props = { onRetry: () => void }

export function ErrorScreen({ onRetry }: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-10 text-center">
      <h1 className="title-creepy text-4xl text-blood">{strings.error.title}</h1>
      <p className="mt-4 max-w-xs text-bone/80">{strings.error.body}</p>
      <button type="button" onClick={onRetry} className="mt-8 w-full max-w-sm rounded-2xl bg-blood py-4 text-lg font-bold">
        {strings.error.retry}
      </button>
    </div>
  )
}
