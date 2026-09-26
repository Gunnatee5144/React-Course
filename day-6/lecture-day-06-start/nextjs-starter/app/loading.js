// มีให้แล้วใน starter — ชี้ให้ดูในบล็อก 1.3 (live-coding/day-06.md)
// Next.js ห่อ page.js ในโฟลเดอร์เดียวกัน (และโฟลเดอร์ลูก) ด้วย Suspense ให้อัตโนมัติ
// ไฟล์นี้จะโผล่มาเองระหว่างที่ page.js ยัง await ข้อมูลไม่เสร็จ — ไม่ต้องเขียน if (loading) เอง
//
// ⏱ delay จำลองสำหรับสาธิต — เติมบรรทัดนี้เป็นบรรทัดแรกใน async page ไหนก็ได้
//    (เช่น MoviesPage ในบล็อก 2.1) แล้ว reload จะเห็น "กำลังโหลด..." ค้าง 2 วินาที
//
//      await new Promise((r) => setTimeout(r, 2000))
//
//    🔴 ลบออกก่อนจบคาบ — ห้ามติดไปถึง Lab บ่าย

export default function Loading() {
  return <p>กำลังโหลด...</p>
}
