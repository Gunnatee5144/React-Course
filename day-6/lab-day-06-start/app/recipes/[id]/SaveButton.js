'use client'

import { useState } from 'react'

// Client Component (Lab B วิธี B): แยก "เฉพาะจุดที่ต้องมี state" ออกมาไฟล์เล็ก ๆ นี้
// RecipeDetailCard ที่เหลือจึงยังเป็น Server Component
export default function SaveButton() {
  const [saved, setSaved] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setSaved((v) => !v)}
      aria-pressed={saved}
      className="border px-4 py-2 rounded font-medium"
    >
      {saved ? '✓ บันทึกแล้ว' : '+ บันทึกสูตรนี้'}
    </button>
  )
}
