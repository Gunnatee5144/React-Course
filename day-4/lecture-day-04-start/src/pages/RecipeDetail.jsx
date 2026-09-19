import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'

function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  )

  async function handleRandom() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const json = await res.json()
    const newId = json.meals[0].idMeal
    navigate(`/recipes/${newId}`)
  }

  if (loading) return <p>กำลังโหลด...</p>
  if (error) return <p>{error}</p>

  const meal = data?.meals?.[0]                          // ⚠️ TheMealDB คืน 3 ชั้น
  if (!meal) return (
    <div>
      <p>ไม่พบเมนูนี้</p>
      <Link to="/recipes">← กลับไปหน้ารายการ</Link>
    </div>
  )

  return (
    <article>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-64 rounded" />
      <h1 className="text-2xl font-bold">{meal.strMeal}</h1>
      <p>{meal.strInstructions}</p>
      <div className="flex gap-4 mt-4">
        <button onClick={handleRandom} className="border px-3 py-1 rounded">
          🎲 สุ่มเมนูใหม่
        </button>
        <Link to="/recipes">← กลับ</Link>
      </div>
    </article>
  )
}
export default RecipeDetail
