"use client"

import { useState } from "react"

export default function AddRecipeForm() {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage("")
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category }),
    })
    const data = await response.json()
    if (!response.ok) {
      setMessage(data.error)
      return
    }
    setName("")
    setCategory("")
    setMessage(`เพิ่ม ${data.name} แล้ว รีเฟรชหน้าเพื่อดูรายการ`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-end">
      <label className="flex flex-col gap-1">
        <span className="text-sm">ชื่อเมนู</span>
        <input value={name} onChange={event => setName(event.target.value)} required className="border rounded px-3 py-2" />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm">หมวดหมู่</span>
        <input value={category} onChange={event => setCategory(event.target.value)} required className="border rounded px-3 py-2" />
      </label>
      <button type="submit" className="border rounded px-3 py-2">เพิ่มสูตร</button>
      {message && <p className="basis-full text-sm text-gray-600">{message}</p>}
    </form>
  )
}// ว่าง (Client Component) — ⌨️ พิมพ์สดบล็อก 2.5
// ปุ่มที่ POST ไป "/api/recipes" (path สัมพัทธ์ได้ เพราะรันที่ browser) — ต้องมี "use client" เพราะมี onClick
