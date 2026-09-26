import { ROOM, MAX_HOURS } from '../data/rooms.js'
import WeekGrid from './WeekGrid.jsx'

function BookingPage() {
  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold">{ROOM.name}</h1>
      <p className="mt-1 text-sm text-gray-500">
        ความจุ {ROOM.capacity} ที่นั่ง · จองได้ครั้งละไม่เกิน {MAX_HOURS} ชั่วโมง และต้องเป็นวันเดียวกัน
      </p>
      <WeekGrid />
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500">
        <span>
          <span className="mr-1 inline-block h-3 w-3 rounded border border-blue-600 bg-blue-600 align-middle" />
          เลือกอยู่
        </span>
        <span>
          <span className="mr-1 inline-block h-3 w-3 rounded border border-gray-200 bg-gray-100 align-middle" />
          ฝ่ายอื่นจองแล้ว (กดไม่ได้)
        </span>
        <span>
          <span className="mr-1 inline-block h-3 w-3 rounded border border-gray-200 bg-white align-middle" />
          กดไม่ได้ — คนละวันกับที่เลือกไว้
        </span>
      </div>
    </section>
  )
}
export default BookingPage
