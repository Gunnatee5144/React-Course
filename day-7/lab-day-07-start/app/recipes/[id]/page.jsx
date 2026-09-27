import { notFound } from "next/navigation"
import AddFavoriteButton from "@/components/AddFavoriteButton"

function getIngredients(meal) {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ ingredient: ingredient.trim(), measure: measure ? measure.trim() : "" })
    }
  }
  return ingredients
}

export default async function RecipeDetailPage({ params }) {
  const { id } = await params
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const { meals } = await res.json()
  // ⚠️ TheMealDB ตอบ "ไม่พบ" ได้หลายหน้าตา: {"meals":null} (id ตัวเลขไม่มีจริง) หรือ
  //    {"meals":"Invalid ID"} (id ไม่ใช่ตัวเลข) — ต้องเช็ค Array.isArray ก่อน ไม่งั้น
  //    "Invalid ID"[0] จะได้ "I" ซึ่งเป็นค่า truthy หลุดผ่าน !meal ไปได้
  const meal = Array.isArray(meals) ? meals[0] : null

  if (!meal) {
    notFound()
  }

  const ingredients = getIngredients(meal)

  return (
    <article className="max-w-2xl mx-auto p-4">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg" />
      <h1 className="text-2xl font-bold mt-4">{meal.strMeal}</h1>
      <p className="text-sm text-gray-500">{meal.strCategory}</p>

      <AddFavoriteButton mealId={meal.idMeal} name={meal.strMeal} thumb={meal.strMealThumb} />

      <h2 className="font-bold mt-6">วัตถุดิบ ({ingredients.length} อย่าง)</h2>
      <ul className="list-disc pl-5">
        {ingredients.map((item, i) => (
          <li key={i}>{item.measure} · {item.ingredient}</li>
        ))}
      </ul>

      <h2 className="font-bold mt-6">วิธีทำ</h2>
      <p className="whitespace-pre-line">{meal.strInstructions}</p>
    </article>
  )
}
