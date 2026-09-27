import AddRecipeForm from "@/components/AddRecipeForm"

export const dynamic = "force-dynamic"
export const revalidate = 15

export default async function MyRecipesPage() {
  const response = await fetch("http://localhost:3000/api/recipes", { next: { revalidate: 15 } })
  const recipes = await response.json()

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">สูตรอาหารของฉัน</h1>
      <AddRecipeForm />
      <ul className="mt-6 space-y-2">
        {recipes.map(recipe => (
          <li key={recipe.id} className="border rounded p-3">
            <span className="font-medium">{recipe.name}</span>
            <span className="text-sm text-gray-500 ml-2">({recipe.category})</span>
          </li>
        ))}
      </ul>
    </section>
  )
}// ว่าง — ⌨️ พิมพ์สดบล็อก 2.6 (fetch "/api/recipes" ของเราเอง + next: { revalidate: 15 } แล้วพิสูจน์ผ่าน Network tab)
