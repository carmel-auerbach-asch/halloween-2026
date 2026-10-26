import type { Handler } from '@netlify/functions'

type Rsvp = {
  adultName: string
  phone?: string
  kidsAges: number[]
  hamburgersMeat: number
  hamburgersVeggie: number
  candyBags: number
  alcoholDrinkers: number
}

const clamp = (n: unknown, max = 10) => {
  const v = Number(n)
  if (!Number.isFinite(v)) return 0
  return Math.min(max, Math.max(0, Math.round(v)))
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }
  const url = process.env.SHEET_WEBHOOK_URL
  if (!url) {
    return { statusCode: 500, body: 'SHEET_WEBHOOK_URL is not set' }
  }

  let body: Partial<Rsvp>
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: 'Bad JSON' }
  }

  const adultName = String(body.adultName || '').trim().slice(0, 80)
  if (!adultName) return { statusCode: 400, body: 'adultName required' }

  const kidsAges = Array.isArray(body.kidsAges)
    ? body.kidsAges.map((a) => clamp(a, 18)).slice(0, 12)
    : []

  const payload = {
    timestamp: new Date().toISOString(),
    adult_name: adultName,
    phone: String(body.phone || '').trim().slice(0, 30),
    kids_ages: kidsAges.join(', '),
    kids_count: kidsAges.length,
    hamburgers_meat: clamp(body.hamburgersMeat),
    hamburgers_veggie: clamp(body.hamburgersVeggie),
    candy_bags: clamp(body.candyBags),
    alcohol_drinkers: clamp(body.alcoholDrinkers),
    user_agent: event.headers['user-agent'] || '',
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    })
    const text = await res.text()
    if (!res.ok || !text.includes('ok')) {
      console.error('Sheet error', res.status, text)
      return { statusCode: 502, body: 'Sheet rejected the row' }
    }
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  } catch (err) {
    console.error(err)
    return { statusCode: 502, body: 'Could not reach sheet' }
  }
}
