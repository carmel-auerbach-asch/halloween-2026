// Generates qr/qr-sheet.html with one big QR per page. Open it in a browser and print (Ctrl+P).
// Usage: node qr/make-qr.mjs https://halloweeneinay.netlify.app
import QRCode from 'qrcode'
import { writeFileSync } from 'node:fs'
const base = (process.argv[2] || 'https://halloweeneinay.netlify.app').replace(/\/$/, '')
const titles = ['רמז ראשון', 'רמז שני', 'רמז שלישי', 'רמז רביעי', 'הרמז האחרון']
let pages = ''
for (let i = 1; i <= titles.length; i++) {
  const url = `${base}/#/clue/${i}`
  const svg = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'H', margin: 1, color: { dark: '#000000', light: '#ffffff' } })
  pages += `<section class="page"><div class="title">${titles[i - 1]}</div><div class="qr">${svg}</div><div class="hint">צלמו עם המצלמה</div><div class="url">${url}</div></section>`
}
const html = `<!doctype html><html dir="rtl" lang="he"><head><meta charset="utf-8"><title>QR sheet</title>
<style>
@page { size: A4; margin: 0; }
body { margin: 0; font-family: Arial, sans-serif; background: #fff; }
.page { page-break-after: always; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; }
.title { font-size: 56px; font-weight: 900; }
.qr svg { width: 150mm; height: 150mm; }
.hint { font-size: 28px; color: #333; }
.url { font-size: 14px; color: #888; direction: ltr; }
</style></head><body>${pages}</body></html>`
writeFileSync(new URL('./qr-sheet.html', import.meta.url), html)
console.log('wrote qr/qr-sheet.html for', base)
