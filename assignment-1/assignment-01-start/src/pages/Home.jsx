// ข้อ 2: หน้าแรก — ข้อความต้อนรับ + ลิงก์ไป /pokemon + จำนวนสมาชิกทีมตอนนี้
import { Link } from 'react-router-dom'
import { useTeam } from '../context/TeamContext'

function Home() {
  const { count, maxSize } = useTeam()

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold">Pokédex Team Builder</h1>
      <p className="mt-2 text-gray-600">
        เลือก Pokémon รุ่นแรก (#1–#151) จัดทีมของฉันได้สูงสุด {maxSize} ตัว
      </p>
      <p className="mt-4 text-lg">
        ตอนนี้ทีมมี{' '}
        <b className="text-red-600">
          {count}/{maxSize}
        </b>{' '}
        ตัว
      </p>
      <Link to="/pokemon" className="mt-6 inline-block rounded-md bg-red-600 px-4 py-2 font-semibold text-white">
        ไปหน้ารายการ
      </Link>
    </div>
  )
}

export default Home
