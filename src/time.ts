import { EVENT_DATE } from './clues'

// Converts an Israel-local wall-clock time to a UTC timestamp, regardless of the phone's timezone.
export function israelTime(year: number, month: number, day: number, hour: number, minute: number): number {
  const guess = Date.UTC(year, month - 1, day, hour, minute)
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jerusalem',
    hourCycle: 'h23',
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
  }).formatToParts(new Date(guess))
  const get = (k: string) => Number(parts.find((p) => p.type === k)?.value)
  const shown = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'))
  return guess - (shown - guess)
}

// "HH:MM" on the event day, Israel time.
export function eventTime(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return israelTime(EVENT_DATE.year, EVENT_DATE.month, EVENT_DATE.day, h, m)
}

export function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`
}
