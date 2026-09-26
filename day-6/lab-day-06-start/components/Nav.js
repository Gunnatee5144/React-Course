'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Client Component: ต้องใช้ usePathname เพื่อรู้ว่าอยู่ path ไหน แล้วไฮไลต์เมนูที่ active
function linkClass(isActive) {
  return isActive
    ? 'font-bold text-orange-600'
    : 'text-gray-600 hover:text-gray-900'
}

export default function Nav() {
  const pathname = usePathname()

  // "/" ต้องตรงเป๊ะ (เทียบ NavLink end) — ไม่งั้นทุก path ขึ้นต้นด้วย "/" แล้วไฮไลต์ค้าง
  const isHome = pathname === '/'
  // /recipes และ /recipes/52772 ต้อง active ทั้งคู่ (ไม่ใช้ === เพราะต้องการให้ค้างในหน้า detail)
  const isRecipes = pathname === '/recipes' || pathname.startsWith('/recipes/')
  const isAbout = pathname === '/about'

  return (
    <nav className="max-w-4xl mx-auto flex gap-6 p-4">
      <Link href="/" className={linkClass(isHome)}>หน้าแรก</Link>
      <Link href="/recipes" className={linkClass(isRecipes)}>สูตรอาหาร</Link>
      <Link href="/about" className={linkClass(isAbout)}>เกี่ยวกับ</Link>
    </nav>
  )
}
