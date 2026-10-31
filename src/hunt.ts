// Which clues this phone has scanned. Stored locally so progress survives a reload.
const KEY = 'hunt_found'

export function foundIds(): number[] {
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(arr) ? arr.filter((n) => typeof n === 'number') : []
  } catch {
    return []
  }
}

export function markFound(id: number) {
  try {
    const set = new Set(foundIds())
    set.add(id)
    localStorage.setItem(KEY, JSON.stringify([...set].sort((a, b) => a - b)))
  } catch {
    /* ignore */
  }
}

// Reads "#/clue/3" from the URL. Returns null when not on a clue link.
export function clueIdFromHash(hash = window.location.hash): number | null {
  const m = /^#\/clue\/(\d+)/.exec(hash)
  return m ? Number(m[1]) : null
}
