import { ROOM, MAX_HOURS } from '../data/rooms.js'
import WeekGrid from './WeekGrid.jsx'

function BookingPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">{ROOM.name}</h1>
      <p className="mt-1 text-sm text-gray-500">
        ความจุ {ROOM.capacity} ที่นั่ง · จองได้ครั้งละไม่เกิน {MAX_HOURS} ชั่วโมง และต้องเป็นวันเดียวกัน
      </p>
      <WeekGrid />
    </section>
  )
}
export default BookingPage
