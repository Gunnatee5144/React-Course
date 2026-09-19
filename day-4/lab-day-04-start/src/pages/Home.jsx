import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h2 className="text-xl font-bold">Recipe Browser</h2>
      <p className="text-gray-500 mt-2">ค้นหาและดูรายละเอียดสูตรอาหารจาก TheMealDB</p>
      <Link to="/recipes" className="inline-block mt-4 text-orange-600 underline text-sm">
        ไปหน้าสูตรอาหาร →
      </Link>
    </div>
  )
}

export default Home
