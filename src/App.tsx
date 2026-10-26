import { useState } from 'react'
import { Home } from './components/Home'
import { RsvpForm } from './components/RsvpForm'
import { Scare } from './components/Scare'
import { Success } from './components/Success'
import { ErrorScreen } from './components/ErrorScreen'
import { DoomsDay } from './components/DoomsDay'
import { submitRsvp } from './api'
import { emptyRsvp, type Rsvp, type Screen } from './types'

const UNLOCK_KEY = 'doomsday_unlocked'

function readUnlocked(): boolean {
  try {
    return localStorage.getItem(UNLOCK_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [rsvp, setRsvp] = useState<Rsvp>(emptyRsvp)
  const [unlocked, setUnlocked] = useState(readUnlocked)
  const soundOn = true
  const [sending, setSending] = useState(false)

  function markUnlocked() {
    setUnlocked(true)
    try {
      localStorage.setItem(UNLOCK_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  async function send() {
    if (sending) return
    setSending(true)
    try {
      await submitRsvp(rsvp)
      setScreen('success')
    } catch {
      setScreen('error')
    } finally {
      setSending(false)
    }
  }

  switch (screen) {
    case 'home':
      return (
        <Home
          unlocked={unlocked}
          onEnter={() => setScreen('form')}
          onUnlocked={markUnlocked}
          onDoomsDay={() => setScreen('doomsday')}
        />
      )
    case 'form':
      return (
        <RsvpForm
          initial={rsvp}
          onBack={() => setScreen('home')}
          onSubmit={(r) => {
            setRsvp(r)
            setScreen('scare')
          }}
        />
      )
    case 'scare':
      return <Scare soundOn={soundOn} sending={sending} onConfirm={send} onReconsider={() => setScreen('form')} />
    case 'success':
      return (
        <Success
          rsvp={rsvp}
          onHome={() => {
            setRsvp(emptyRsvp)
            setScreen('home')
          }}
        />
      )
    case 'error':
      return <ErrorScreen onRetry={() => setScreen('scare')} />
    case 'doomsday':
      return <DoomsDay onBack={() => setScreen('home')} />
  }
}
