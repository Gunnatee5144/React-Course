import recipeData from "./recipes.json"

const recipes = [...recipeData]

export function getRecipes(category) {
	if (!category) return recipes
	return recipes.filter(recipe => recipe.category.toLowerCase() === category.toLowerCase())
}

export function addRecipe(recipe) {
	const nextRecipe = { id: recipes.length + 1, ...recipe }
	recipes.push(nextRecipe)
	return nextRecipe
}
// ว่าง — in-memory store ⌨️ พิมพ์สดบล็อก 2.4
// import recipes.json แล้ว copy เป็น array ในหน่วยความจำ (ไม่แตะไฟล์จริง)
