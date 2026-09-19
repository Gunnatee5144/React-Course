import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'

function RecipeDetail() {
  const { id } = useParams()
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  )
  const meal = data?.meals?.[0] ?? null

  if (loading) return <p className="text-gray-500 text-sm">กำลังโหลด...</p>
  if (error) return <p className="text-red-500 text-sm">เกิดข้อผิดพลาด: {error}</p>

  if (!meal) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-3">ไม่พบสูตรนี้ (id: {id})</p>
        <Link to="/recipes" className="inline-block border border-slate-300 rounded-md px-3 py-1.5 text-sm">
          ← กลับไปหน้ารายการ
        </Link>
      </div>
    )
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => {
    const ing = meal[`strIngredient${i + 1}`]
    const measure = meal[`strMeasure${i + 1}`]
    return ing && ing.trim() ? `${measure?.trim()} ${ing.trim()}` : null
  }).filter(Boolean)

  return (
    <div>
      <Link to="/recipes" className="text-xs text-gray-500">← กลับ</Link>
      <h2 className="text-lg font-extrabold mt-1">{meal.strMeal}</h2>
      <p className="text-xs text-gray-500 mb-3">{meal.strCategory} · {meal.strArea}</p>
      <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" className="rounded-lg w-full max-w-sm mb-3" />
      <div className="text-sm font-extrabold mb-1">ส่วนผสม</div>
      <p className="text-sm text-slate-700 leading-relaxed">
        {ingredients.map((line, i) => (
          <span key={i}>• {line} </span>
        ))}
      </p>
    </div>
  )
}

export default RecipeDetail
