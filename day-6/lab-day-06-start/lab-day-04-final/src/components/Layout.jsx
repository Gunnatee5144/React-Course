import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <Nav />
      </header>
      <main className="flex-1 max-w-4xl mx-auto p-6 w-full">
        <Outlet />        {/* ★ หน้าลูกมาเสียบตรงนี้ — ลืมบรรทัดนี้ = nav อยู่ แต่เนื้อหาหน้าหายหมด ไม่มี error */}
      </main>
      <footer className="border-t p-4 text-center text-sm text-gray-400">
        © 2026 DII CAMT · ข้อมูลจาก TheMealDB
      </footer>
    </div>
  )
}
export default Layout
