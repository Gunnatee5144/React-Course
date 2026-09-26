# `lab-day-06-start` — โปรเจกต์ตั้งต้นของแล็บบ่าย วันที่ 6

โครงตั้งต้นสำหรับ **Lab วันที่ 6 — Recipe Browser → Next.js App Router**
⏱ **🔖 Quiz ส่วนที่ 1 13:00–13:10 (กระดาษ ห้าม AI) · Lab A 13:10–14:00 · Lab B 14:00–14:50 · Explain-Back 14:50–15:00**

> 📦 **ของอ้างอิงวันนี้:** TA แจก zip เฉลย Lab วันที่ 4 (`projects/day-04/lab-day-04-final/`) ให้ทุกกลุ่มตอน 13:10 — ใช้โปรเจกต์ของกลุ่มตัวเองเป็นหลัก เฉลยไว้ดูโครง UI/รูปแบบข้อมูล TheMealDB หรือใช้แทนถ้างานวันที่ 4 ของกลุ่มพัง · **ห้ามก๊อป JSX มาวางตรง ๆ**
โจทย์เต็มอยู่ที่ `labs/day-06.md` — โฟลเดอร์นี้คือ**ที่ที่ต้องเขียนโค้ดและส่งงาน** · หน้าตาเป้าหมายเหมือน Recipe Browser วันที่ 4 (`../../day-04/lab-day-04-start/mockup-recipe-browser.png`)

> ℹ️ วันนี้**ไม่ใช่**วันหมุดหมาย (คะแนน ×1) — 🎯 มินิแอป #4 คือ Lab วันที่ 7
> 🔓 Lab A ใช้ AI ได้ (อธิบายได้ทุกบรรทัดเมื่อ TA ถาม) · 🔴 **Lab B ข้อ debug ห้ามเปิด AI 10 นาทีแรก**
> 📤 **ส่ง Final Project Proposal ท้ายวันนี้** (`assignments/final-project.md` ข้อ 2)

create-next-app 15 (App Router · Tailwind CSS v4 · ESLint · JavaScript) ต่อไว้ให้แล้ว — โครงเดียวกับ `nextjs-starter` ตอนเช้า แต่ล้างของเลกเชอร์ (movies) ออกแล้ว
`app/layout.js` กับ `app/page.js` มีแค่ตัวกันพัง · ไฟล์ component/lib **ว่างไว้ตั้งใจ** มีแค่คอมเมนต์ · **ไฟล์ route (`page.js`/`not-found.js`) ยังไม่มี — สร้างเอง** (สร้างโฟลเดอร์ + `page.js` = ได้ route ตามที่เรียนเช้านี้)

---

## เริ่มยังไง

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 🔴 ต้องผ่านก่อนส่ง
```

| ปัญหา | ทางแก้ |
|---|---|
| `You're importing a component that needs useState...` / `Event handlers cannot be passed to Client Component props` | ไฟล์นั้นมี hook/event handler แต่ไม่มี `"use client"` บรรทัดแรก |
| `The default export is not a React Component` | สร้าง `page.js` แล้วแต่ยังไม่มี `export default` |
| `npm run build` ล้มที่ ESLint `no-unescaped-entities` | ใส่ `"` ตรง ๆ ใน JSX — ใช้ `&quot;` แทน |
| `npm run build` ล้มที่ `no-html-link-for-pages` | ใช้ `<a href="/...">` ลิงก์ภายในแอป — ใช้ `Link` จาก `next/link` |
| port 3000 ชน | `npm run dev -- -p 3001` |

---

## API — TheMealDB (ตัวเดิมวันที่ 4 ฟรี ไม่ต้องใช้ key)

```
รายการเริ่มต้น:  https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert
ค้นหา:          https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
รายละเอียด:     https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
```

⚠️ หาไม่เจอจะได้ `{ "meals": null }` + HTTP 200 — **ไม่ใช่ 404**

---

## ไฟล์ที่ต้องเขียน

| Route เดิม (วันที่ 4) | ไฟล์ Next.js | Server/Client | สถานะในโฟลเดอร์นี้ |
|---|---|---|---|
| `<Layout>` | `app/layout.js` + `components/Nav.js` | Server layout (+ `Nav` Client) | layout มีตัวกันพัง · `Nav.js` ว่าง |
| `/` | `app/page.js` | Server | มีตัวกันพัง |
| `/recipes` | `app/recipes/page.js` + `SearchBox.js` | Server (+ `SearchBox` Client) | `page.js` **สร้างเอง** · `SearchBox.js` ว่าง |
| — | `app/recipes/RecipeCard.js` + `FavoriteButton.js` | Server (+ `FavoriteButton` Client) | ว่าง |
| `/recipes/:id` | `app/recipes/[id]/page.js` + `RecipeDetailCard.js` | Server | `page.js` **สร้างเอง** · `RecipeDetailCard.js` ว่าง |
| `/about` | `app/about/page.js` | Server | **สร้างเอง** |
| `*` | `app/not-found.js` | Server | **สร้างเอง** |
| — | `lib/getIngredients.js` | ไม่ใช่ component | ว่าง |
| Lab B | `BUGS.md` | — | แม่แบบ 3 หัวข้อ — กรอกระหว่าง B1–B3 |

⚠️ Next.js 15: `params` / `searchParams` เป็น **Promise** — `await` ก่อนอ่านค่าเสมอ (Twist ข้อ 4)
⚠️ Lab B (14:00) TA จะแจก `app/recipes/[id]/RecipeDetailCard.js` เวอร์ชันพังให้วางทับ — **เก็บเวอร์ชันของตัวเองไว้ก่อน**

---

## เกณฑ์ให้คะแนนวันนี้

**Lab A (pass/fail — ผ่านครบทุกข้อ = 60%)**
- [ ] แปลงหน้าจาก React SPA มาเป็น Next.js App Router ครบตามจำนวน route ที่กำหนด
- [ ] แยก Server/Client Component ถูกต้องตามเกณฑ์ขั้นต่ำ (เช่น layout เป็น Server, ส่วน interactive เป็น Client)
- [ ] ไม่มี hydration error ค้างใน console ตอนส่งงาน

**Lab B (คุณภาพ — 40%)**
- อธิบายถูกต้องว่า error ที่จงใจใส่ (hook ใน Server Component) เกิดจากอะไร และแก้ถูกวิธี — **50%**
- README/คอมเมนต์อธิบายเหตุผลว่าทำไมแต่ละไฟล์เป็น Server/Client — **50%** ← กรอกตารางข้างล่าง

---

## เช็กเองก่อนส่ง (Twist ที่ TA จะลอง)

```
☐ ทั้ง 5 route ทำงาน: /  /recipes  /recipes/52772  /about  และ path มั่ว ๆ → 404
☐ เมนูที่อยู่ไฮไลต์ถูก — "หน้าแรก" ไม่ไฮไลต์ค้างทุกหน้า · อยู่ที่ /recipes/52772 แล้ว "สูตรอาหาร" ยังไฮไลต์
☐ /recipes?q=chicken เปิดในแท็บใหม่ → ช่องค้นหาขึ้น "chicken" + ผลตรง
☐ /recipes/99999 → "ไม่พบสูตรนี้" ไม่ใช่จอขาว/500
☐ มี Client Component อย่างน้อย 1 ตัวที่เป็น "ลูก" ของ Server Component (ไม่ใช่ทั้งการ์ดเป็น Client)
☐ หน้า /recipes ไม่มี useState/useEffect/loading spinner ที่เขียนเอง
☐ Console ไม่มี warning เรื่อง sync access ของ params/searchParams · ไม่มี hydration error
☐ npm run build ผ่าน
```

---

## ตาราง Server/Client ของกลุ่ม (Lab B 50%)

| ไฟล์ | Server หรือ Client | เหตุผล 1 ประโยค |
|---|---|---|
| `app/layout.js` | Server | ไม่มี state/event จึงเป็น Server ได้ — ถือ `<html>/<body>`/footer และวาง `Nav` (Client) เป็นลูก |
| `components/Nav.js` | Client | ต้องใช้ `usePathname` (hook) เพื่อรู้ path ปัจจุบันไว้ไฮไลต์เมนู active |
| `app/page.js` | Server | เป็นแค่ข้อความ + `Link` ไม่มี state หรือ event handler |
| `app/recipes/page.js` | Server | เป็น async component fetch ข้อมูลบน server และ `await searchParams` ตรง ๆ จึงไม่ต้องใช้ useState/useEffect/loading เอง |
| `app/recipes/SearchBox.js` | Client | มี `useState` ค่าในช่อง + `onChange` + `useRouter` เพื่อดันคำค้นเข้า URL |
| `app/recipes/RecipeCard.js` | Server | ไฟล์นี้เองไม่มี hook/event handler — แค่รูป+ชื่อ+ลิงก์ จึงไม่ต้องส่ง JS ของการ์ดไป client |
| `app/recipes/FavoriteButton.js` | Client | มี `useState` สลับ ☆/★ และ `onClick` — แยกให้เล็กที่สุดเป็นลูกของการ์ด Server |
| `app/recipes/[id]/page.js` | Server | async component `await params` แล้ว fetch รายละเอียดบน server พร้อมจัดการกรณี `meals: null` |
| `app/recipes/[id]/RecipeDetailCard.js` | Server | แสดงผลล้วน ไม่มี hook — ส่วนที่ต้องมี state ถูกแยกไป `SaveButton` (Lab B วิธี B) |
| `app/recipes/[id]/SaveButton.js` (Lab B) | Client | มี `useState` + `onClick` สลับสถานะบันทึก — แยกเฉพาะจุดเพื่อให้ส่ง JS ไป client น้อยที่สุด |
| `app/about/page.js` · `app/not-found.js` | Server | เนื้อหาคงที่ ไม่มี interaction จึงเป็น Server ทั้งคู่ |
