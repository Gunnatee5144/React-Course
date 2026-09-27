// Lab B d) — แก้หน้านี้ให้ fetch จาก /api/my-recipes ของกลุ่มเอง (ไม่ใช่ /api/recipes ของเช้า)
//           + ใส่ { next: { revalidate: N } } อย่างชัดเจน แล้วพิสูจน์ผ่าน Network tab
// app/my-recipes/page.jsx
import { connection } from "next/server"   // ⚠️ ไม่มีในสคริปต์ — ดู README หัวข้อ "ต่างจากสคริปต์"

export default async function MyRecipesPage() {
  await connection()   // ⚠️ ไม่มีในสคริปต์ — กัน `npm run build` พัง (ตอน build ยังไม่มี server ที่ localhost:3000 ให้ fetch)
  const res = await fetch("http://localhost:3000/api/my-recipes", {
    next: { revalidate: 20 }
  })
  const recipes = await res.json()
  return (
    <ul className="max-w-2xl mx-auto p-4">
      {recipes.map(r => (
        <li key={r.id} className="flex items-center gap-3 border-b py-2">
          {r.thumb && <img src={r.thumb} alt={r.name} className="w-12 h-12 rounded object-cover" />}
          {r.name}
        </li>
      ))}
    </ul>
  )
}
