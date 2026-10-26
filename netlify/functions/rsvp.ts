import type { Handler } from '@netlify/functions'

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

  let body: Record<string, unknown>
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return { statusCode: 400, body: 'Bad JSON' }
  }

  const adultName = String(body.adultName || '').trim().slice(0, 80)
  if (!adultName) return { statusCode: 400, body: 'adultName required' }

  const kids0to5 = clamp(body.kids0to5)
  const kids6to10 = clamp(body.kids6to10)
  const kids11to17 = clamp(body.kids11to17)

  const payload = {
    timestamp: new Date().toISOString(),
    adult_name: adultName,
    kids_0_5: kids0to5,
    kids_6_10: kids6to10,
    kids_11_17: kids11to17,
    kids_total: kids0to5 + kids6to10 + kids11to17,
    hamburgers_meat: clamp(body.hamburgersMeat),
    hamburgers_veggie: clamp(body.hamburgersVeggie),
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
