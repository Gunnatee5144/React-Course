import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Recipe Browser</h1>
      <p className="text-gray-500 mb-6">
        ค้นหาสูตรอาหารจาก TheMealDB — แปลงมาจาก React SPA วันที่ 4
      </p>
      <Link href="/recipes" className="border px-4 py-2 rounded">
        ไปหน้าค้นหาสูตรอาหาร →
      </Link>
    </div>
  )
}
