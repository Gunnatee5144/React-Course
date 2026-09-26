"use client"

// มีให้แล้วใน starter — ชี้ให้ดูในบล็อก 1.3: บรรทัดแรกต้องเป็น "use client" เสมอ (มี onClick)
// เหตุผลเต็ม ๆ มาในบล็อก 2.2–2.3

export default function Error({ error, reset }) {
  return (
    <div>
      <p>เกิดข้อผิดพลาด: {error.message}</p>
      <button onClick={() => reset()}>ลองใหม่</button>
    </div>
  )
}
