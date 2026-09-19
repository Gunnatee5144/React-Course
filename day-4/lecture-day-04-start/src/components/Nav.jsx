import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  isActive ? "font-bold text-blue-600 underline" : "text-gray-600"

function Nav() {
  return (
    <nav className="flex gap-4 p-4 border-b">
      <NavLink to="/" end className={linkClass}>หน้าแรก</NavLink>
      <NavLink to="/recipes" className={linkClass}>สูตรอาหาร</NavLink>
      <NavLink to="/about" className={linkClass}>เกี่ยวกับ</NavLink>
    </nav>
  )
}
export default Nav
