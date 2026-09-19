import { Link, useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'

const LIST_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
const SEARCH_URL = (q) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''

  const { data, loading, error } = useFetch(q ? SEARCH_URL(q) : LIST_URL)
  const meals = data?.meals ?? null

  function handleChange(e) {
    const value = e.target.value
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">สูตรอาหาร</h2>
      <input
        type="text"
        value={q}
        onChange={handleChange}
        placeholder="ค้นหาสูตรอาหาร เช่น chicken"
        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-4"
      />

      {loading && <p className="text-gray-500 text-sm">กำลังโหลด...</p>}
      {error && <p className="text-red-500 text-sm">เกิดข้อผิดพลาด: {error}</p>}
      {!loading && !error && !meals && (
        <p className="text-gray-500 text-sm">ไม่พบสูตรอาหาร</p>
      )}

      {!loading && !error && meals && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {meals.map((meal) => (
            <Link
              key={meal.idMeal}
              to={`/recipes/${meal.idMeal}`}
              className="border border-slate-200 rounded-lg overflow-hidden block hover:shadow-md transition"
            >
              <img src={meal.strMealThumb} alt={meal.strMeal} className="aspect-[4/3] w-full object-cover" />
              <p className="text-xs font-semibold p-2">{meal.strMeal}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Recipes
