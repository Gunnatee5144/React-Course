// Server Component — แสดงผลล้วน ไม่มี hook/event handler ในไฟล์นี้
// ส่วนที่ต้องมี state (ปุ่มบันทึก) แยกไปอยู่ SaveButton.js (Client) — ดู BUGS.md B3
import Image from 'next/image'
import Link from 'next/link'
import { getIngredients } from '@/lib/getIngredients'
import SaveButton from './SaveButton'

export default function RecipeDetailCard({ meal }) {
  const ingredients = getIngredients(meal)

  return (
    <article>
      <Link href="/recipes" className="text-sm text-gray-500">← กลับ</Link>
      <h1 className="text-3xl font-bold my-3">{meal.strMeal}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {meal.strCategory} · {meal.strArea}
      </p>
      <Image
        src={meal.strMealThumb}
        alt={meal.strMeal}
        width={700}
        height={700}
        sizes="(min-width: 448px) 448px, 100vw"
        className="w-full max-w-md h-auto rounded mb-4"
        priority
      />

      <div className="mb-6">
        <SaveButton />
      </div>

      <h2 className="text-xl font-bold mb-2">ส่วนผสม</h2>
      <ul className="mb-6 space-y-1">
        {ingredients.map((x) => (
          <li key={x.name}>• {x.measure} {x.name}</li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mb-2">วิธีทำ</h2>
      <p className="whitespace-pre-line leading-relaxed">{meal.strInstructions}</p>
    </article>
  )
}
