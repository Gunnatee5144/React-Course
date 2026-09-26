// Server Component — ไม่มี hook/event handler ในไฟล์นี้เอง
// ส่วน interactive (ปุ่มถูกใจ) แยกเป็น FavoriteButton (Client) แล้ววางเป็นลูก
// → การ์ดทั้งใบไม่ต้องเป็น Client และไม่ถูกส่ง JS ไปที่เบราว์เซอร์โดยไม่จำเป็น
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'

export default function RecipeCard({ meal }) {
  return (
    <div className="border rounded overflow-hidden flex flex-col">
      <Link href={`/recipes/${meal.idMeal}`} className="block">
        <div className="relative w-full aspect-square">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
        <p className="p-2 text-sm font-medium">{meal.strMeal}</p>
      </Link>
      <FavoriteButton />
    </div>
  )
}
