// Server Component (async) — อ่าน :id จาก params แล้ว fetch บน server
import Link from 'next/link'
import RecipeDetailCard from './RecipeDetailCard'

async function getMeal(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`
  )
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  return json.meals?.[0] ?? null // id ไม่มีจริง = { meals: null } + HTTP 200
}

export default async function RecipeDetailPage({ params }) {
  // Next.js 15: params เป็น Promise — ต้อง await ก่อนอ่านค่า
  const { id } = await params

  let meal = null
  let error = null
  try {
    meal = await getMeal(id)
  } catch (e) {
    error = e.message
  }

  if (error) return <p className="text-red-700">⚠️ เกิดข้อผิดพลาด: {error}</p>

  // id format ถูกแต่ไม่มีจริง (เช่น /recipes/99999) ต้องไม่จอขาว/500
  if (!meal) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">ไม่พบสูตรนี้ (id: {id})</p>
        <Link href="/recipes" className="border px-4 py-2 rounded inline-block">
          ← กลับไปหน้ารายการ
        </Link>
      </div>
    )
  }

  return <RecipeDetailCard meal={meal} />
}
