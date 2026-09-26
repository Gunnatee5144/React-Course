import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'

// TheMealDB เก็บส่วนผสมเป็น strIngredient1..20 / strMeasure1..20 — ต้องรวบเอง
function getIngredients(meal) {
  return Array.from({ length: 20 }, (_, i) => i + 1)
    .map(i => ({ name: meal[`strIngredient${i}`], measure: meal[`strMeasure${i}`] }))
    .filter(x => x.name && x.name.trim())
}

function RecipeDetail() {
  // ★ useParams อ่าน :id จาก "โครงสร้าง path" — path="recipes/:id" ชื่อ param ต้องตรงกับที่ประกาศใน App.jsx
  //   ต่างจาก useSearchParams ตรงที่ useParams "อ่านอย่างเดียว" (ไม่มี setParams) เพราะ path
  //   เปลี่ยนได้แค่ตอน navigate ไป route ใหม่ ไม่ใช่แก้ค่าคงอยู่ที่เดิมแบบ query string
  const { id } = useParams()

  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  )

  if (loading) return <p className="text-gray-500">กำลังโหลด...</p>
  if (error) return <p className="text-red-700">⚠️ {error}</p>

  const meal = data?.meals?.[0]     // ★ meals เป็น null ได้ (id ไม่มีจริง) → ต้อง ?. สองชั้น

  // ★ Twist ข้อ 4 — id format ถูกแต่ไม่มีอยู่จริง (เช่น /recipes/99999) ต้องไม่จอขาว
  if (!meal) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 mb-4">ไม่พบสูตรนี้ (id: {id})</p>
        <Link to="/recipes" className="border px-4 py-2 rounded inline-block">← กลับไปหน้ารายการ</Link>
      </div>
    )
  }

  const ingredients = getIngredients(meal)

  return (
    <article>
      <Link to="/recipes" className="text-sm text-gray-500">← กลับ</Link>
      <h1 className="text-3xl font-bold my-3">{meal.strMeal}</h1>
      <p className="text-sm text-gray-500 mb-4">{meal.strCategory} · {meal.strArea}</p>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-md rounded mb-6" />

      <h2 className="text-xl font-bold mb-2">ส่วนผสม</h2>
      <ul className="mb-6 space-y-1">
        {ingredients.map(x => <li key={x.name}>• {x.measure} {x.name}</li>)}
      </ul>

      <h2 className="text-xl font-bold mb-2">วิธีทำ</h2>
      <p className="whitespace-pre-line leading-relaxed">{meal.strInstructions}</p>
    </article>
  )
}
export default RecipeDetail
