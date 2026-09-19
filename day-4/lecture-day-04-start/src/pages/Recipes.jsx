import { Link, useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''

  const { data, loading, error } = useFetch(
    q
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`
      : 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
  )

  const meals = data?.meals ?? []

  return (
    <>
      <input
        value={q}
        onChange={e => {
          const value = e.target.value
          setSearchParams(value ? { q: value } : {})
        }}
        placeholder="ค้นหาเมนู"
        className="border p-2 rounded w-full"
      />
      {loading && <p className="mt-4">กำลังโหลด...</p>}
      {error && <p className="mt-4">เกิดข้อผิดพลาด: {error}</p>}
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {meals.map(meal => (
          <li key={meal.idMeal}>
            <Link to={`/recipes/${meal.idMeal}`}>
              <img src={meal.strMealThumb} alt={meal.strMeal} className="rounded" />
              <p>{meal.strMeal}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default Recipes
