import { Outlet } from 'react-router-dom'
import Nav from './Nav.jsx'

function Layout() {
  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col bg-white border-x border-slate-200">
      <Nav />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 py-3 text-center text-xs text-slate-400">
        © 2026 DII CAMT · ข้อมูลจาก TheMealDB
      </footer>
    </div>
  )
}

export default Layout
