export default async function BlogPage() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772",
    { cache: "force-cache" }
  )
  const { meals = [] } = await response.json()
  const meal = meals[0]

  return (
    <article>
      <h1 className="text-2xl font-bold mb-4">{meal?.strMeal ?? "เมนูแนะนำ"}</h1>
      {meal && <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full max-w-md rounded-lg mb-4" />}
      <p className="leading-relaxed">เมนูตัวอย่างจาก TheMealDB สำหรับสาธิต Static Generation</p>
    </article>
  )
}// ว่าง — ⌨️ พิมพ์สดบล็อก 2.2 (SSG — สูตรที่โพสต์แล้วไม่แก้ · TheMealDB lookup.php?i=52772)
