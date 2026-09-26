'use client'

import { useState } from 'react'

// Client Component: มี useState + onClick — เล็กที่สุดเท่าที่จำเป็น
// state อยู่ในปุ่มเอง ไม่จำข้ามหน้า
export default function FavoriteButton() {
  const [liked, setLiked] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setLiked((v) => !v)}
      aria-pressed={liked}
      className="text-sm px-2 pb-2 text-orange-600"
    >
      {liked ? '★ ถูกใจแล้ว' : '☆ ถูกใจ'}
    </button>
  )
}
