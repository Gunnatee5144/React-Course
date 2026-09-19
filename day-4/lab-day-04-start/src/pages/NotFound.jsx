import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="text-center py-10">
      <div className="text-3xl font-extrabold">404</div>
      <p className="text-gray-500 my-3">ไม่พบหน้านี้</p>
      <Link to="/" className="text-orange-600 underline text-sm">← กลับหน้าแรก</Link>
    </div>
  )
}

export default NotFound
