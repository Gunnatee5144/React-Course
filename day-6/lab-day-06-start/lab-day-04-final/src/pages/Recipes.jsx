import { useSearchParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch.js'
import { useDebounce } from '../hooks/useDebounce.js'

function Recipes() {
  // ★ useSearchParams ไม่ใช่ useState — ความจริงของคำค้นอยู่ที่ URL เสมอ
  //   นี่คือจุดต่างจาก useParams: useParams อ่านค่าจาก "โครงสร้าง path" (/recipes/:id)
  //   ส่วน useSearchParams อ่าน/เขียนค่าจาก "?query=string" ท้าย URL ได้ทั้งสองทาง
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''          // ★ อ่านตรงนี้ = pre-fill อัตโนมัติเมื่อเปิดหน้าด้วย URL ที่มี ?q= อยู่แล้ว

  const debouncedQ = useDebounce(q, 400)

  const apiUrl = debouncedQ
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(debouncedQ)}`
    : 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'

  const { data, loading, error } = useFetch(apiUrl)
  const meals = data?.meals ?? []                 // ★ TheMealDB คืน meals: null เมื่อหาไม่เจอ ไม่ใช่ HTTP error

  function handleChange(value) {
    // replace: true → พิมพ์แต่ละตัวอักษรไม่สร้าง history entry ใหม่ทุกครั้ง
    // (Twist ข้อ 1) ถ้าไม่ใส่ replace: true กด back 1 ครั้งจะย้อนกลับไปทีละตัวอักษรที่พิมพ์
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">สูตรอาหาร</h1>

      <input
        value={q}
        onChange={e => handleChange(e.target.value)}
        placeholder="ค้นหาเมนู เช่น chicken, pasta"
        className="border rounded px-3 py-2 w-full mb-6"
      />

      {loading && <p className="text-gray-500">กำลังโหลด...</p>}

      {error && (
        <p className="text-red-700">⚠️ เกิดข้อผิดพลาด: {error}</p>
      )}

      {!loading && !error && meals.length === 0 && (
        <p className="text-gray-500">
          {q ? `ไม่พบสูตรที่ตรงกับ "${q}"` : 'ไม่มีข้อมูล'}
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {meals.map(m => (
          <Link key={m.idMeal} to={`/recipes/${m.idMeal}`} className="border rounded overflow-hidden">
            <img src={m.strMealThumb} alt={m.strMeal} className="w-full aspect-square object-cover" />
            <p className="p-2 text-sm font-medium">{m.strMeal}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
export default Recipes
