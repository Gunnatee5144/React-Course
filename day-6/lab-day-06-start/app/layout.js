// Root layout — Server Component (ไม่มี "use client")
// <html>/<body> อยู่ที่นี่ เพราะ Next.js ไม่มี index.html ให้แก้
// <Nav /> เป็น Client Component ที่ถูกวางเป็น "ลูก" ของ Server layout นี้
import './globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Recipe Browser',
}

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <Nav />
          </header>
          {/* {children} ทำหน้าที่แทน <Outlet /> ของวันที่ 4 */}
          <main className="flex-1 max-w-4xl mx-auto p-6 w-full">
            {children}
          </main>
          <footer className="border-t p-4 text-center text-sm text-gray-400">
            © 2026 DII CAMT · ข้อมูลจาก TheMealDB
          </footer>
        </div>
      </body>
    </html>
  )
}
