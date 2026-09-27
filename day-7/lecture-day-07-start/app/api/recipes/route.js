import { addRecipe, getRecipes } from "@/lib/data/recipes"

export async function GET(request) {
	const category = new URL(request.url).searchParams.get("category")
	return Response.json(getRecipes(category))
}

export async function POST(request) {
	const body = await request.json()
	if (!body.name || !body.category) {
		return Response.json({ error: "name และ category จำเป็นต้องมี" }, { status: 400 })
	}

	return Response.json(addRecipe({ name: body.name, category: body.category }), { status: 201 })
}
// ว่าง — ⌨️ พิมพ์สดบล็อก 2.4 (GET) · 🖐 #11 (?category=) · 2.5 (POST)
// ชื่อฟังก์ชันต้องเป็น GET / POST ตัวพิมพ์ใหญ่ล้วน
