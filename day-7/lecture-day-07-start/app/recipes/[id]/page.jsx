import { notFound } from "next/navigation"

export default async function RecipeDetailPage({ params }) {
  const { id } = await params
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`,
    { cache: "force-cache" }
  )
  const { meals = [] } = await response.json()
  const meal = meals[0]

  if (!meal) notFound()

  return (
    <article>
      <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-lg rounded-lg mb-6" />
      <p className="text-gray-600 mb-2">หมวดหมู่: {meal.strCategory}</p>
      <p className="text-gray-600 mb-4">แหล่งกำเนิด: {meal.strArea}</p>
      <p className="leading-relaxed whitespace-pre-line">{meal.strInstructions}</p>
    </article>
  )
}