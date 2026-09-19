import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `px-3 py-1.5 rounded-md text-sm font-medium ${
    isActive ? 'text-orange-600 bg-orange-50 font-bold' : 'text-gray-600 hover:text-gray-900'
  }`

function Nav() {
  return (
    <nav className="flex gap-2 px-4 py-3 border-b border-slate-200">
      <NavLink to="/" end className={linkClass}>หน้าแรก</NavLink>
      <NavLink to="/recipes" className={linkClass}>สูตรอาหาร</NavLink>
      <NavLink to="/about" className={linkClass}>เกี่ยวกับ</NavLink>
    </nav>
  )
}

export default Nav
