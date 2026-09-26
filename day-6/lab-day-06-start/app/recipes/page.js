// Server Component (async) — fetch ข้อมูลบน server ตรง ๆ
// ไม่มี useState/useEffect/loading spinner ที่เขียนเอง
import SearchBox from './SearchBox'
import RecipeCard from './RecipeCard'

export const metadata = {
  title: 'สูตรอาหาร · Recipe Browser',
}

const BASE = 'https://www.themealdb.com/api/json/v1/1'

async function getMeals(q) {
  const url = q
    ? `${BASE}/search.php?s=${encodeURIComponent(q)}`
    : `${BASE}/filter.php?c=Dessert`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  return json.meals ?? [] // หาไม่เจอ = { meals: null } + HTTP 200
}

export default async function RecipesPage({ searchParams }) {
  // Next.js 15: searchParams เป็น Promise — ต้อง await ก่อนอ่านค่า
  const { q: rawQ } = await searchParams
  const q = (Array.isArray(rawQ) ? rawQ[0] : rawQ) ?? ''

  let meals = []
  let error = null
  try {
    meals = await getMeals(q)
  } catch (e) {
    error = e.message
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">สูตรอาหาร</h1>

      {/* ส่งคำค้นจาก URL ให้ SearchBox เป็นค่าเริ่มต้น (pre-fill) */}
      <SearchBox defaultValue={q} />

      {error && <p className="text-red-700">⚠️ เกิดข้อผิดพลาด: {error}</p>}

      {!error && meals.length === 0 && (
        <p className="text-gray-500">
          {q ? `ไม่พบสูตรที่ตรงกับ "${q}"` : 'ไม่มีข้อมูล'}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {meals.map((m) => (
          <RecipeCard key={m.idMeal} meal={m} />
        ))}
      </div>
    </>
  )
}
