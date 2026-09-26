import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center py-8">
      <h1 className="text-3xl font-bold mb-3">Recipe Browser</h1>
      <p className="text-gray-600 mb-6">ค้นหาและดูสูตรอาหารจาก TheMealDB</p>
      <Link to="/recipes" className="inline-block border px-4 py-2 rounded font-medium">
        ดูสูตรอาหารทั้งหมด →
      </Link>
    </div>
  )
}
export default Home
