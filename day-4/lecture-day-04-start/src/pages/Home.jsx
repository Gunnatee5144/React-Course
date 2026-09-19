import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold">Recipe Browser</h1>
      <p className="mt-2 text-gray-600">ค้นหาและดูสูตรอาหารจาก TheMealDB</p>
      <Link to="/recipes" className="text-blue-600 underline mt-4 inline-block">ดูสูตรอาหารทั้งหมด →</Link>
    </div>
  )
}
export default Home
