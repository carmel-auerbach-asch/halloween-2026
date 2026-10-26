import type { Rsvp } from './types'

export async function submitRsvp(rsvp: Rsvp): Promise<void> {
  const res = await fetch('/.netlify/functions/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rsvp),
  })
  if (!res.ok) {
    throw new Error(`rsvp failed: ${res.status}`)
  }
}

export async function checkUnlockCode(code: string): Promise<boolean> {
  const res = await fetch('/.netlify/functions/unlock', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
  if (res.status === 401) return false
  if (!res.ok) throw new Error(`unlock failed: ${res.status}`)
  return true
}
