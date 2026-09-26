// หน้าแรก — Server Component (แค่ข้อความ + ลิงก์ ไม่มี state/event)
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="text-center py-8">
      <h1 className="text-3xl font-bold mb-3">Recipe Browser</h1>
      <p className="text-gray-600 mb-6">ค้นหาและดูสูตรอาหารจาก TheMealDB</p>
      <Link href="/recipes" className="inline-block border px-4 py-2 rounded font-medium">
        ดูสูตรอาหารทั้งหมด →
      </Link>
    </div>
  )
}
