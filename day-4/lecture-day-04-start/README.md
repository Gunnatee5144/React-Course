# `lecture-day-04-start` — โปรเจกต์ประกอบเลกเชอร์ วันที่ 4

โครงสำหรับ **live-coding วันที่ 4 (React Router — SPA Routing & Layouts)** คู่กับสคริปต์ `live-coding/day-04.md`

> 👀 **วันนี้เน้น "ดู" มากกว่า "พิมพ์"** — ไฟล์ส่วนใหญ่เขียนไว้ให้ครบแล้ว อาจารย์จะเปิดอธิบายบนจอ
> ⌨️ **พิมพ์ตามแค่ 6 จุด** — ทุกจุดมีคอมเมนต์ `⌨️ พิมพ์ตาม #N` บอกไว้ในไฟล์แล้ว ตอนที่เหลือ **ดูจออย่างเดียว ไม่ต้องพิมพ์ตาม**

ต่อ Vite + React 19 + **Tailwind CSS v4** (ผ่าน `@tailwindcss/vite` — ไม่มี `tailwind.config.js`) + ติดตั้ง `react-router-dom` ไว้ล่วงหน้าแล้ว (เป็น fallback — ในคาบจะสอนสั่ง `npm install react-router-dom` อีกรอบ รันซ้ำได้ไม่เสียหาย)

---

## คำสั่งที่ใช้

```bash
npm install     # ครั้งแรกครั้งเดียว
npm run dev     # เปิด http://localhost:5173
```

| ปัญหา | ทางแก้ |
|---|---|
| จอขาว `useRoutes() may be used only in the context of a <Router>` | ลืมครอบ `<BrowserRouter>` ที่ `src/main.jsx` (พิมพ์ตาม #1) |
| กดเมนูแล้วหน้ากระพริบ | ยังมี `<a href>` เหลืออยู่ — ต้องเป็น `<Link to>` / `<NavLink to>` |
| Nav อยู่ แต่เนื้อหาหายหมด ไม่มี error | ลืม `<Outlet />` ใน `Layout.jsx` (พิมพ์ตาม #2) |
| install แล้ว `react-router-dom` ไม่ขึ้น | `Ctrl+C` แล้ว `npm run dev` ใหม่ (Vite cache ค้าง) |
| port 5173 ชนกับคนข้าง ๆ | `npm run dev -- --port 5174` |

---

## ⌨️ 6 จุดที่พิมพ์ตาม (ที่เหลือดูอย่างเดียว)

| # | บล็อก | ไฟล์ | พิมพ์อะไร |
|:--:|---|---|---|
| 1 | 1.1 | `main.jsx` + `App.jsx` | ครอบ `<BrowserRouter>` · เปลี่ยน `App` เป็น `<Routes>` 3 หน้า |
| 2 | 1.4 | `components/Layout.jsx` + `App.jsx` | วาง `<Outlet />` · เปลี่ยน route แบนเป็น nested ใต้ `<Layout />` |
| 3 | 1.5 | `App.jsx` | `<Route path="*" element={<NotFound />} />` บรรทัดเดียว |
| 4 | 2.1 | `App.jsx` + `pages/Recipes.jsx` + `pages/RecipeDetail.jsx` | route `recipes/:id` · การ์ดเป็น `<Link>` · `useParams()` |
| 5 | 2.2 | `pages/Recipes.jsx` | เปลี่ยน `useState` เป็น `useSearchParams` |
| 6 | 2.3 | `pages/RecipeDetail.jsx` | `useNavigate()` 2 บรรทัด |

## 👀 ไฟล์ที่มีให้แล้ว — ดูอย่างเดียว

| ไฟล์ | อาจารย์เปิดอธิบายตอน |
|---|---|
| `src/components/Nav.jsx` | 1.2 (`<a>` vs `<Link>` 💥) · 1.3 (`NavLink` + `end`) |
| `src/components/Layout.jsx` | 1.4 — ทั้งไฟล์เขียนไว้แล้ว ขาดแค่ `<Outlet />` |
| `src/pages/Home.jsx` · `About.jsx` · `NotFound.jsx` | 1.1 / 1.5 |
| `src/pages/Recipes.jsx` | 2.1 — แอปวันที่ 3 (list + ค้นหาด้วย `useState`) |
| `src/pages/RecipeDetail.jsx` | 2.1 — หน้า detail ครบแล้ว แต่ `id` ยัง hardcode เป็น `"52772"` |
| `src/hooks/useFetch.js` | ของวันที่ 3 ใช้ต่อได้เลย |
| บล็อก 2.4 `lazy` + `Suspense` | ⏭ อาจารย์ทำให้ดูบนจอ **ไม่พิมพ์ตาม** |

> ⚠️ `App.jsx` ตอนเริ่มคาบ render แค่ `<Recipes />` (หน้าเดียวแบบวันที่ 3) — ตั้งใจไม่ import `Nav`/`Home`/`About`/`NotFound` ไว้ เพราะไฟล์พวกนั้นใช้ `Link` ซึ่งพังทันทีถ้ายังไม่มี `<BrowserRouter>`

---

## 🔓 AI Policy วันนี้

ตั้งแต่วันนี้ **ใช้ AI ช่วยเขียนโค้ดได้แล้ว** — แต่ต้องอธิบายได้ทุกบรรทัดเมื่อถูกถาม โดยเฉพาะ: ถ้า AI เขียนช่องค้นหาด้วย `useState` มา ต้องรู้ทันว่าทำไมต้องเป็น `useSearchParams`

---

## API — TheMealDB (ฟรี ไม่ต้องใช้ key)

```
รายการ:   https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert
ค้นหา:    https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
รายละเอียด: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
สุ่ม:      https://www.themealdb.com/api/json/v1/1/random.php
```

⚠️ หาไม่เจอ TheMealDB คืน `{ "meals": null }` + HTTP 200 — **ไม่ใช่ 404** ต้องเช็ก `data?.meals?.[0]` เอง

- `../lecture-day-04-final/` — โค้ดปลายทางตอน ✅ เช็กพร้อมกัน #4 (11:50) **สำหรับอาจารย์/TA เท่านั้น ห้ามแจกก่อนจบคาบ**
