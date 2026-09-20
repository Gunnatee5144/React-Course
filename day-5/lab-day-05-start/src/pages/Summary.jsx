import { Link, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.jsx'
import { MAX_HOURS, slotLabel } from '../data/rooms.js'

function Summary() {
  const { slots, remove, clear } = useBooking()
  const navigate = useNavigate()
  const sorted = [...slots].sort()

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          รายการที่เลือก ({slots.length}/{MAX_HOURS} ชม.)
        </h1>
        {slots.length > 0 && (
          <button type="button" onClick={clear} className="text-sm text-red-600 hover:underline">
            ล้างทั้งหมด
          </button>
        )}
      </div>

      {slots.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">ยังไม่ได้เลือกช่วงเวลา — กลับไปหน้าจองห้องก่อน</p>
      ) : (
        <ul className="mt-4 divide-y rounded border">
          {sorted.map((id) => (
            <li key={id} className="flex items-center justify-between px-4 py-3">
              <span>{slotLabel(id)}</span>
              <button
                type="button"
                onClick={() => remove(id)}
                className="rounded border border-red-600 px-3 py-1 text-sm text-red-600 hover:bg-red-50"
              >
                เอาออก
              </button>
            </li>
          ))}
        </ul>
      )}

      {slots.length > 0 && (
        <button
          type="button"
          onClick={() => navigate('/confirm')}
          className="mt-6 rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          ยืนยันการจอง
        </button>
      )}

      <div className="mt-4">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← กลับไปเลือกเวลา
        </Link>
      </div>
    </section>
  )
}
export default Summary
