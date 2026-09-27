export const revalidate = 60

export default async function ProductsPage() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood",
    { next: { revalidate: 60 } }
  )
  const { meals = [] } = await response.json()

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">เมนูซีฟู้ด</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {meals.map(meal => (
          <article key={meal.idMeal} className="border rounded-lg overflow-hidden">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full aspect-square object-cover" />
            <p className="p-3 font-medium text-sm">{meal.strMeal}</p>
          </article>
        ))}
      </div>
    </section>
  )
}// ว่าง — ⌨️ พิมพ์สดบล็อก 2.2 (ISR — TheMealDB filter.php?c=Seafood + next: { revalidate: 60 })
