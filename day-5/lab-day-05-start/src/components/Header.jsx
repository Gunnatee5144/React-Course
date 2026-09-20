import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.jsx'
import { MAX_HOURS } from '../data/rooms.js'

function Header() {
  const { totalHours } = useBooking()

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3">
      <Link to="/" className="text-lg font-bold">
        🏢 จองห้องประชุม
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">
          จองแล้ว {totalHours} ชม. / สูงสุด {MAX_HOURS} ชม.
        </span>
        <Link to="/summary" className="text-sm text-blue-600 hover:underline">
          ดูรายการที่เลือก
        </Link>
      </div>
    </header>
  )
}
export default Header
