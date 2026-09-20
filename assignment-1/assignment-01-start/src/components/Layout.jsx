// ข้อ 2: layout route — Nav + Outlet + footer
import { Outlet } from 'react-router-dom'
import Nav from './Nav'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-lg border bg-white shadow-sm">
          <Nav />
          <div className="p-6">
            <Outlet />
          </div>
        </div>
        <footer className="py-6 text-center text-xs text-gray-400">Pokédex Team Builder — Assignment 1</footer>
      </div>
    </div>
  )
}

export default Layout
