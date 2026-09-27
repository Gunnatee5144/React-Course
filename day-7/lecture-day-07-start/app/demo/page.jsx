export const dynamic = "force-dynamic"

export default async function DemoPage() {
  const response = await fetch("http://localhost:3000/api/time", { cache: "force-cache" })
  const data = await response.json()

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">การสาธิต Fetch Cache</h1>
      <p>เวลาที่ดึงมา: {data.time}</p>
    </section>
  )
}// ว่าง — ⌨️ พิมพ์สดบล็อก 1.3 (ใช้ต่อถึง 1.4 no-store และ 1.5 revalidate)
// Server Component: async function DemoPage() → await fetch("http://localhost:3000/api/time") → แสดง "เวลาที่ดึงมา: ..."
// ⚠️ Next.js 15: บล็อก 1.3 ต้องใส่ { cache: "force-cache" } ให้ชัด ไม่งั้นเวลาไม่ค้าง (ดูแผนสำรองแถวสุดท้ายในสคริปต์)
