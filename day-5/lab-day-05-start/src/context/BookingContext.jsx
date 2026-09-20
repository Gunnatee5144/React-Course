import { createContext, useContext, useState } from 'react'
import { BOOKED, MAX_HOURS, dayOf } from '../data/rooms.js'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [slots, setSlots] = useState([])

  const toggle = (id) => {
    if (BOOKED.includes(id)) return
    setSlots((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id)
      if (prev.length >= MAX_HOURS) return prev
      if (prev.length > 0 && dayOf(prev[0]) !== dayOf(id)) return prev
      return [...prev, id]
    })
  }

  const remove = (id) => setSlots((prev) => prev.filter((s) => s !== id))
  const clear = () => setSlots([])

  const value = { slots, toggle, remove, clear, totalHours: slots.length }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
