// The Black Spot hunt. Each clue is opened by scanning a QR code that points to
//   https://<site>/#/clue/<id>
// Edit text freely. `availableFrom` (optional) is an Israel local time "HH:MM" today;
// before that time the page shows a countdown instead of the clue.

export type Clue = {
  id: number
  title: string
  text: string
  availableFrom?: string
}

export const EVENT_DATE = { year: 2026, month: 10, day: 31 }

export const clues: Clue[] = [
  {
    id: 1,
    title: 'רמז ראשון',
    text: 'כשהיה או הייתה בן/בת חמש, עוד לא ידעו מה זה באג 2000.',
  },
  {
    id: 2,
    title: 'רמז שני',
    text: 'השם שלו או שלה מתחיל באות שהיא האחרונה מהסוף.',
  },
  {
    id: 3,
    title: 'רמז שלישי',
    text: 'היא או הוא הגיעו עם יותר מילד.ה אחת.ד.',
  },
  {
    id: 4,
    title: 'רמז רביעי',
    text: 'מי שקיבל.ה את הנקודה עובד.ת בחברה בגודל בינוני (עד 200 עובדים).',
  },
  {
    id: 5,
    title: 'הרמז האחרון',
    text: 'למי שקיבל.ה את הנקודה יש קשר לעין הירוקה.',
    availableFrom: '20:00',
  },
]

export const hunt = {
  intro: 'הנקודה השחורה ניתנה לאחד מכם. חפשו בחצר פתקים עם ברקוד, צלמו אותם עם המצלמה של הטלפון, וכל אחד יפתח רמז.',
  foundLabel: 'רמזים שמצאתם',
  lockedTitle: 'עוד לא הגיע הזמן',
  lockedBody: 'הרמז הזה ייפתח בשעה',
  notFound: 'הברקוד הזה לא מוכר. נסו שוב.',
  backToHunt: 'לכל הרמזים',
  missing: 'עדיין לא נמצא',
}
