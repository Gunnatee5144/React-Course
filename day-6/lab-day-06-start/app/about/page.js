// Server Component — เนื้อหาคงที่ ไม่มี interaction
export const metadata = {
  title: 'เกี่ยวกับ · Recipe Browser',
}

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">เกี่ยวกับ</h1>
      <p className="text-gray-600">
        แอปนี้จัดทำเพื่อฝึก Next.js App Router — ข้อมูลสูตรอาหารทั้งหมดมาจาก{' '}
        {/* ลิงก์ออกนอกแอป ใช้ <a> ได้ (no-html-link-for-pages ห้ามเฉพาะลิงก์ภายใน) */}
        <a
          href="https://www.themealdb.com"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          TheMealDB
        </a>
      </p>
    </div>
  )
}
