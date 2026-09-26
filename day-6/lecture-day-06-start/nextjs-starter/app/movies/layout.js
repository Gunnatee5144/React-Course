// ⌨️ โครงว่าง — เติมสดในบล็อก 1.4 (nested layout)
// TODO: MoviesLayout รับ { children } แล้ววาง nav "หมวดหนัง" ไว้เหนือ {children}
//       nav นี้ต้องโผล่เฉพาะหน้าใต้ /movies เท่านั้น (ไม่ใช่ทุกหน้าเหมือน root layout)
//       ลิงก์ใช้ <Link href="/movies"> จาก "next/link" — <a href> เฉย ๆ ทำให้ npm run build ไม่ผ่าน (ESLint)
//
// ⚠️ บรรทัด export ข้างล่างเป็นแค่ตัวกันพัง (layout.js ที่ไม่มี default export ทำให้ build ไม่ผ่าน)
//    ลบทิ้งแล้วพิมพ์ของจริงแทนตอนถึงบล็อก 1.4

import Link from "next/link";

export default function MoviesLayout({ children }) {
  return (
    <>
      <nav className="border-b border-black/10 px-6 py-4">
        <Link className="font-semibold hover:underline" href="/movies">
          Ghibli Movies
        </Link>
      </nav>
      {children}
    </>
  );
}
