// ข้อ 2: NavLink หน้าแรก / Pokédex / ทีม (n/6) — active state ถูกต้อง, จำนวนทีมมาจาก useTeam()
import { NavLink } from 'react-router-dom'
import { useTeam } from '../context/TeamContext'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-1.5 text-sm font-semibold ${isActive ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`

function Nav() {
  const { count, maxSize } = useTeam()

  return (
    <nav className="flex items-center gap-2 border-b bg-white px-4 py-3">
      <NavLink to="/" end className={linkClass}>
        หน้าแรก
      </NavLink>
      <NavLink to="/pokemon" className={linkClass}>
        Pokédex
      </NavLink>
      <NavLink to="/team" className={linkClass}>
        ทีม ({count}/{maxSize})
      </NavLink>
    </nav>
  )
}

export default Nav
