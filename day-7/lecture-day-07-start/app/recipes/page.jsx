import RecipeList from "@/components/RecipeList"
import FeaturedRecipes from "@/components/FeaturedRecipes"

export default async function RecipesPage() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert",
    { cache: "force-cache" }
  )

  if (!response.ok) throw new Error("โหลดสูตรอาหารไม่สำเร็จ")
  const { meals = [] } = await response.json()

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">สูตรอาหารประเภทของหวาน</h1>
      <FeaturedRecipes recipes={meals.slice(0, 3)} />
      <RecipeList recipes={meals} />
    </>
  )
}
