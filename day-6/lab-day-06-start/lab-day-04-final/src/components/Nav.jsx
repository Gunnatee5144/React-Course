import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  isActive ? "font-bold text-orange-600" : "text-gray-600 hover:text-gray-900"

function Nav() {
  return (
    <nav className="max-w-4xl mx-auto flex gap-6 p-4">
      <NavLink to="/" end className={linkClass}>หน้าแรก</NavLink>
      {/*                ↑ ★ end — ไม่งั้น active ตลอดทุกหน้า เพราะทุก path ขึ้นต้นด้วย "/" */}
      <NavLink to="/recipes" className={linkClass}>สูตรอาหาร</NavLink>
      {/* ★ ไม่ใส่ end ตรงนี้โดยตั้งใจ — ต้องการให้ active ค้างตอนอยู่ /recipes/52772 ด้วย (Twist ทางอ้อม) */}
      <NavLink to="/about" className={linkClass}>เกี่ยวกับ</NavLink>
    </nav>
  )
}
export default Nav
