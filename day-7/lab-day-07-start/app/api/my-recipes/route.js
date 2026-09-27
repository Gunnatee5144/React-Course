import { NextResponse } from "next/server"
import { myRecipes } from "@/lib/data/my-recipes"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")
  const result = q
    ? myRecipes.filter(r => r.name.toLowerCase().includes(q.toLowerCase()))
    : myRecipes
  return NextResponse.json(result)
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "body ต้องเป็น JSON" }, { status: 400 })
  }

  if (!body.mealId || !body.name) {
    return NextResponse.json({ error: "ต้องมี mealId และ name" }, { status: 400 })
  }

  const exists = myRecipes.some(r => r.mealId === body.mealId)
  if (exists) {
    return NextResponse.json({ error: "สูตรนี้อยู่ในรายการโปรดแล้ว" }, { status: 409 })
  }

  const newFavorite = { id: Date.now(), mealId: body.mealId, name: body.name, thumb: body.thumb ?? null }
  myRecipes.push(newFavorite)
  return NextResponse.json(newFavorite, { status: 201 })
}
