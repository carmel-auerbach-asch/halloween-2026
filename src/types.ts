export type Rsvp = {
  adultName: string
  kids0to5: number
  kids6to10: number
  kids11to17: number
  hamburgersMeat: number
  hamburgersVeggie: number
  alcoholDrinkers: number
}

export const emptyRsvp: Rsvp = {
  adultName: '',
  kids0to5: 0,
  kids6to10: 0,
  kids11to17: 0,
  hamburgersMeat: 0,
  hamburgersVeggie: 0,
  alcoholDrinkers: 0,
}

export type Screen = 'home' | 'form' | 'scare' | 'success' | 'error' | 'doomsday'
