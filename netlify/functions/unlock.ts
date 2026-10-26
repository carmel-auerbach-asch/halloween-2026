import type { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }
  const expected = process.env.DOOMSDAY_CODE
  if (!expected) {
    return { statusCode: 500, body: 'DOOMSDAY_CODE is not set' }
  }
  let code = ''
  try {
    code = String(JSON.parse(event.body || '{}').code || '').trim()
  } catch {
    return { statusCode: 400, body: 'Bad JSON' }
  }
  if (code === expected) {
    return { statusCode: 200, body: JSON.stringify({ ok: true }) }
  }
  return { statusCode: 401, body: JSON.stringify({ ok: false }) }
}
