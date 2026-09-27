export const dynamic = "force-dynamic"

export default async function StockPage() {
  const response = await fetch("http://localhost:3000/api/stock", { cache: "no-store" })
  const stock = await response.json()

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">ราคาหุ้นจำลอง</h1>
      <p className="text-3xl font-mono">{stock.symbol}: ${stock.price}</p>
    </section>
  )
}// ว่าง — ⌨️ พิมพ์สดบล็อก 2.2 (SSR — ราคาหุ้นสมมติ)
// 💥 เริ่มจาก fetch("http://localhost:3000/api/stock") แบบ cache → ราคาค้าง → แก้เป็น { cache: "no-store" }
