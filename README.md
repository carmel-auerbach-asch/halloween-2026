# האלווין 2026 - RSVP App

Mobile-first RSVP page. Guests fill the form, a zombie asks if they are sure, and the answer lands in a Google Sheet used for ordering food. A locked "Dooms Day" button on the home screen opens with a secret code announced at the party.

## Stack

- Vite + React + TypeScript + Tailwind v4
- Two Netlify Functions: `rsvp` (forwards to Google Sheet) and `unlock` (checks the Dooms Day code)
- Google Apps Script web app that appends rows to the sheet

## 1. Google Sheet setup

1. Create a new Google Sheet. Name it anything.
2. Extensions > Apps Script. Delete the default code and paste the contents of `google-apps-script/Code.gs`.
3. Save. In the function dropdown pick `setup` and press Run. Approve the permissions. This creates the `Responses` and `Summary` tabs.
4. Deploy > New deployment. Type: Web app.
   - Execute as: Me
   - Who has access: Anyone
5. Copy the Web app URL (ends with `/exec`). This is `SHEET_WEBHOOK_URL`.
6. Test: open that URL in a browser. You should see `ok`.

If you change the script later, you must create a New deployment (or edit the existing one and bump the version) for the change to go live.

## 2. Netlify setup

1. Push this folder to a GitHub repo.
2. In Netlify: Add new site > Import from Git > pick the repo. Build settings are read from `netlify.toml`.
3. Site configuration > Environment variables. Add:
   - `SHEET_WEBHOOK_URL` = the Apps Script URL from step 1
   - `DOOMSDAY_CODE` = `100156` (or whatever you want)
4. Deploy. The site URL is what you send to guests.

## 3. Local run

```bash
npm install
cp .env.example .env   # fill in the values
npx netlify dev        # runs the site + functions on http://localhost:8888
```

`npm run dev` alone runs the UI without the functions (submits will fail).

## Sheet columns

`Responses` tab:
timestamp, adult_name, phone, kids_ages, kids_count, hamburgers_meat, hamburgers_veggie, candy_bags, alcohol_drinkers, user_agent

`Summary` tab: totals for families, kids, meat burgers, veggie burgers, candy bags, alcohol drinkers, and kids by age bracket (0-5, 6-9, 10-13, 14-18). Updates live.

## Customizing

- All text: `src/strings.ts`
- Party title: `strings.partyTitle` and `<title>` in `index.html`
- Dooms Day code: the `DOOMSDAY_CODE` env var in Netlify
- Dooms Day screen content: `src/components/DoomsDay.tsx`
- Zombie image: replace `public/zombie.svg` with your own png/jpg/gif and update `ZOMBIE_SRC` in `src/components/Scare.tsx`
- Growl sound: drop `public/growl.mp3`. Plays only if the guest turned sound on from the home screen (browsers block autoplay).
- Colors and fonts: `src/index.css` under `@theme`

## Behavior notes

- Submit button is disabled while sending, so no double rows.
- If the function fails, guests see an error screen and their answers are kept.
- Dooms Day unlock is remembered in the phone's localStorage.
- `prefers-reduced-motion` skips the zombie run and shows the question immediately.
