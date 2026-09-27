# `lecture-day-07-start` — โปรเจกต์ประกอบเลกเชอร์ วันที่ 7

โครงสำหรับ **live-coding วันที่ 7 (Next.js — Data Fetching, Rendering Strategies & Route Handlers)** คู่กับสคริปต์ `live-coding/day-07.md`
ตรงกับหัวข้อ "ไฟล์เริ่มต้นที่ต้องเตรียม (`lecture-day-07-start`)" ท้ายสคริปต์

> 🎯 **วันนี้ 🎯 มินิแอป #4 (วันหมุดหมาย ×1.5)** — แล็บบ่ายต่อจากโปรเจกต์นี้โดยตรง
> 🔖 บ่ายนี้เริ่มด้วย Quiz ส่วนที่ 2 (13:00–13:15) ก่อนเข้า Lab A

Next.js **15.5** (App Router) · React 19 · Tailwind CSS v4 (`@tailwindcss/postcss` — ไม่มี `tailwind.config.js`) · ESLint · **JavaScript ไม่ใช่ TypeScript** — ตั้งค่าแบบเดียวกับ `create-next-app` ของวันที่ 6 (ไม่มี `src/`, import alias `@/*`)

---

## คำสั่งที่ใช้

```bash
npm install     # ครั้งแรกครั้งเดียว
npm run dev     # เปิด http://localhost:3000
```

🔴 **ต้องรันที่ port 3000 เท่านั้น** — `/demo`, `/stock`, `/my-recipes` ที่จะพิมพ์วันนี้ `fetch("http://localhost:3000/api/...")` ตรง ๆ ถ้า port ชนแล้ว Next.js ย้ายไป 3001 เอง หน้าพวกนี้จะ `fetch failed` ทันที → ปิดโปรแกรมที่ใช้ 3000 อยู่ก่อน

| ปัญหา | ทางแก้ |
|---|---|
| เปิด `/demo` `/stock` `/blog` `/products` `/my-recipes` แล้วขึ้น error `The default export is not a React Component` | ปกติ — ไฟล์ยังว่าง รอพิมพ์สดในบล็อกนั้น |
| เปิด `/api/time` `/api/stock` `/api/recipes` แล้วได้ `405 Method Not Allowed` | ปกติ — `route.js` ยังว่าง (ยังไม่มี `export async function GET`) |
| terminal ขึ้น `fetch failed` / `ECONNREFUSED` | dev server ไม่ได้อยู่ที่ port 3000 หรือยังไม่ได้พิมพ์ `app/api/.../route.js` ตัวที่หน้านั้นเรียก |
| ⚠️ `/demo` บล็อก 1.3 เวลา**ขยับ**ทุกครั้งทั้งที่ยังไม่ใส่อะไร | Next.js 15 ไม่ cache `fetch` เป็นค่าเริ่มต้นแล้ว → ใส่ `{ cache: "force-cache" }` ให้ชัด (สคริปต์ "แผนสำรอง" แถวสุดท้าย) |
| ใส่ `force-cache`/`revalidate` แล้วเวลายังขยับทุกครั้ง | ติ๊ก **Disable cache** ใน DevTools ค้างไว้ หรือกด hard reload (Cmd/Ctrl+Shift+R) — ในโหมด dev สองอย่างนี้ส่ง header `no-cache` ทำให้ Next.js ข้าม cache ของ `fetch` ไปเลย ให้เอาติ๊กออกแล้วกด refresh ธรรมดา |

---

## แผนที่ไฟล์ — อะไรมีให้แล้ว อะไรว่าง

```
app/
├── layout.jsx              👀 ของวันที่ 6 (Server layout + <Nav />)
├── page.jsx                👀 ของวันที่ 6 (หน้าแรก)
├── about/page.jsx          👀 ของวันที่ 6
├── not-found.jsx           👀 ของวันที่ 6 (404 ของทั้งแอป — Lab บ่ายนี้พึ่งไฟล์นี้)
├── recipes-old/page.jsx    👀 client-fetch เดิม ("use client" + useFetch) — เปิดโชว์บล็อก 1.1 · ห้ามลบทั้งวัน
├── recipes/page.jsx        ⌨️ ตอนนี้ยังเป็น client-fetch — บล็อก 1.1–1.2 เปลี่ยนเป็น async Server Component
├── demo/page.jsx           ⌨️ ว่าง — บล็อก 1.3 → 1.4 → 1.5
├── stock/page.jsx          ⌨️ ว่าง — บล็อก 2.2 (SSR)
├── blog/page.jsx           ⌨️ ว่าง — บล็อก 2.2 (SSG)
├── products/page.jsx       ⌨️ ว่าง — บล็อก 2.2 (ISR)
├── my-recipes/page.jsx     ⌨️ ว่าง — บล็อก 2.6 (revalidate + Network tab)
└── api/
    ├── time/route.js       ⌨️ ว่าง — บล็อก 1.3
    ├── stock/route.js      ⌨️ ว่าง — บล็อก 2.2
    └── recipes/route.js    ⌨️ ว่าง — บล็อก 2.4 (GET) · 🖐 #11 · 2.5 (POST)
components/
├── Nav.jsx                 👀 ของวันที่ 6 (Client — usePathname)
├── RecipeList.jsx          👀 grid ของการ์ด · key={recipe.idMeal}
├── RecipeCard.jsx          👀 การ์ดหนึ่งใบ (ยังไม่มี <Link> — Lab A บ่ายนี้เติม)
├── FeaturedRecipes.jsx     👀 Server Component ลูก — ใช้ในบล็อก 1.2
└── AddRecipeForm.jsx       ⌨️ ว่าง (Client Component) — บล็อก 2.5
hooks/
└── useFetch.js             👀 ของวันที่ 3/4 — ใช้ใน recipes-old เท่านั้น
lib/data/
├── recipes.json            👀 สูตรอาหารชุดเล็กของเราเอง 5 รายการ (แยกจาก TheMealDB)
└── recipes.js              ⌨️ ว่าง — in-memory store บล็อก 2.4
```

---

## ต่อมาจากวันที่ 6 ยังไง (สำหรับอาจารย์/TA ที่เตรียมเครื่อง)

โปรเจกต์นี้ **ไม่ได้ก็อปมาจาก `projects/day-06/` ตรง ๆ** — สร้างตามที่ `live-coding/day-07.md` บรรยายสถานะเริ่มต้นไว้ ถ้าจะเอาโปรเจกต์วันที่ 6 ของตัวเองมาต่อ ให้ทำตามนี้:

1. **เปลี่ยนนามสกุล `.js` → `.jsx`** ทุกไฟล์ใน `app/` ที่เป็น component (`layout`, `page`, `not-found`, `about/page`) และ `components/Nav` — วันที่ 6 ใช้ `.js` แต่สคริปต์/แล็บวันที่ 7–8 อ้าง `.jsx` ทั้งหมด (drift ที่รู้อยู่แล้วใน `CLAUDE.md`) · `route.js`, `hooks/useFetch.js`, `lib/data/*.js` ยังเป็น `.js`
2. **ย้ายการ์ดไปไว้ที่ `components/`** — วันที่ 6 วาง `RecipeCard.js` ไว้ใน `app/recipes/` และรับ prop ชื่อ `meal` · วันที่ 7 อ้าง `@/components/RecipeCard` / `@/components/RecipeList` ที่รับ prop ชื่อ `recipe`/`recipes`
3. **`app/recipes/page.jsx` ต้องกลับเป็น client-fetch (`"use client"` + `useFetch`)** ให้บล็อก 1.1 มีของให้แปลง แล้วก็อปไฟล์เดียวกันไปไว้ที่ `app/recipes-old/page.jsx` (ชื่อฟังก์ชัน `RecipesOldPage`)
4. **ยังไม่มีหน้า detail `app/recipes/[id]/`** และการ์ดยังไม่มี `<Link>` — Lab A บ่ายนี้สร้างเอง
5. ไม่เอา `SearchBox` / `FavoriteButton` / `RecipeDetailCard` / `SaveButton` / `lib/getIngredients.js` ของวันที่ 6 มา — สคริปต์และแล็บวันที่ 7 ไม่อ้างถึง
6. เพิ่ม `hooks/useFetch.js` (ของวันที่ 3/4), `components/FeaturedRecipes.jsx`, `lib/data/recipes.json` และไฟล์ว่างตามแผนที่ข้างบน

> ⚠️ ข้อ 3–4 **สวนทางกับเฉลย Lab วันที่ 6** (`labs/day-06.md`) ที่ทำ `/recipes` เป็น Server Component + `searchParams`, มี `/recipes/[id]` และการ์ดมี `<Link>` ไปแล้ว — โปรเจกต์นี้ยึด `live-coding/day-07.md` ตามที่สั่งไว้ ถ้านักศึกษาเอาโปรเจกต์วันที่ 6 ของตัวเองมาต่อ บล็อก 1.1 และ Lab A จะดูเหมือน "ทำไปแล้ว"

---

## API ที่ใช้วันนี้

```
TheMealDB รายการ:   https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert     (/recipes, /recipes-old)
TheMealDB รายการ:   https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood     (/products)
TheMealDB 1 เมนู:   https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772        (/blog)
ของเราเอง:          http://localhost:3000/api/time · /api/stock · /api/recipes
```

- `../lecture-day-07-final/` — โค้ดปลายทางตอน ✅ เช็กพร้อมกัน #4 (11:55) **สำหรับอาจารย์/TA เท่านั้น ห้ามแจกก่อนจบคาบ**
