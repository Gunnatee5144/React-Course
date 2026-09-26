'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

// Client Component: มี useState (ค่าในช่อง) + onChange + useRouter
// รับค่าเริ่มต้นจาก RecipesPage (Server) ทาง prop → เปิด /recipes?q=chicken แล้วช่องขึ้น "chicken" ทันที
export default function SearchBox({ defaultValue = '' }) {
  const router = useRouter()
  const [value, setValue] = useState(defaultValue)

  // debounce 400ms แล้วค่อยดัน URL — ช่องพิมพ์ไม่หน่วง และไม่ยิง fetch ทุกตัวอักษร
  useEffect(() => {
    if (value === defaultValue) return
    const timer = setTimeout(() => {
      const q = value.trim()
      // replace แทน push → พิมพ์แล้วไม่ทิ้ง history ทุกตัวอักษร (เทียบ { replace: true } วันที่ 4)
      router.replace(q ? `/recipes?q=${encodeURIComponent(q)}` : '/recipes')
    }, 400)
    return () => clearTimeout(timer)
  }, [value, defaultValue, router])

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="ค้นหาเมนู เช่น chicken, pasta"
      className="border rounded px-3 py-2 w-full mb-6"
    />
  )
}
