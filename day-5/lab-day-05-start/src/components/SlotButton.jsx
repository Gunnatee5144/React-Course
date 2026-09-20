import { BOOKED, MAX_HOURS, dayOf, slotId } from '../data/rooms.js'
import { useBooking } from '../context/BookingContext.jsx'

function SlotButton({ dayCode, hour }) {
  const { slots, toggle } = useBooking()
  const id = slotId(dayCode, hour)
  const picked = slots.includes(id)
  const takenByOthers = BOOKED.includes(id)
  const otherDay = slots.length > 0 && dayOf(slots[0]) !== dayCode
  const full = slots.length >= MAX_HOURS && !picked
  const disabled = takenByOthers || otherDay || full

  const reason = takenByOthers
    ? 'ฝ่ายอื่นจองไปแล้ว'
    : otherDay
      ? 'จองข้ามวันไม่ได้ — ล้างรายการก่อนถ้าจะเปลี่ยนวัน'
      : full
        ? `จองได้ครั้งละไม่เกิน ${MAX_HOURS} ชั่วโมง`
        : undefined

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      disabled={disabled}
      title={reason}
      className={
        'w-full rounded border px-1 py-1.5 text-xs ' +
        (picked
          ? 'border-blue-600 bg-blue-600 font-semibold text-white'
          : takenByOthers
            ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400 line-through'
            : disabled
              ? 'cursor-not-allowed border-gray-200 bg-white text-gray-300'
              : 'border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50')
      }
    >
      {String(hour).padStart(2, '0')}:00
    </button>
  )
}
export default SlotButton
