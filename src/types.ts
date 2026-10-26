export type Rsvp = {
  adultName: string
  phone: string
  kidsAges: number[]
  hamburgersMeat: number
  hamburgersVeggie: number
  candyBags: number
  alcoholDrinkers: number
}

export const emptyRsvp: Rsvp = {
  adultName: '',
  phone: '',
  kidsAges: [],
  hamburgersMeat: 0,
  hamburgersVeggie: 0,
  candyBags: 0,
  alcoholDrinkers: 0,
}

export type Screen = 'home' | 'form' | 'scare' | 'success' | 'error' | 'doomsday'
