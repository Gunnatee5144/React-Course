# `lab-day-04-final` — เฉลยเต็มของแล็บบ่ายวันที่ 4

> 🔴 **สำหรับอาจารย์/TA เท่านั้น — ห้ามแจกให้นักศึกษาก่อนจบ Lab B (14:50)**
> 🎯 มินิแอปหมุดหมายชิ้นที่ 2 — คะแนนวันนี้คูณ ×1.5

โค้ดชุดนี้ตรงกับ **"เฉลยเต็ม — TA เท่านั้น" ใน `labs/day-04.md` บรรทัดต่อบรรทัด** (แก้ที่เอกสารเมื่อไหร่ ต้องแก้ที่นี่ในรอบเดียวกัน)

```bash
npm install
npm run dev
```

## เกณฑ์อยู่ตรงไหนในโค้ด

| เกณฑ์ | ไฟล์ |
|---|---|
| Lab A · layout route ใช้ nav ร่วมกัน | `App.jsx` (route พ่อ `element={<Layout />}`) + `components/Layout.jsx` (`<Outlet />`) |
| Lab A · SPA ไม่ reload | ทุกลิงก์ภายในเป็น `Link`/`NavLink` — `<a href>` มีจุดเดียวใน `About.jsx` ซึ่งเป็นลิงก์**ออกนอกแอป** (ถูกต้อง) |
| Lab A · 404 | `App.jsx` `path="*"` ล่างสุด + `pages/NotFound.jsx` |
| Lab B · `:id` ถูกต้อง (30%) | `pages/RecipeDetail.jsx` — `useParams()` อย่างเดียว ไม่พึ่ง state จากหน้าก่อน |
| Lab B · query sync สองทาง (30%) | `pages/Recipes.jsx` — `value={q}` จาก `searchParams.get('q')` + `setSearchParams(..., { replace: true })` |
| Lab B · debounce (25%) | `hooks/useDebounce.js` (`clearTimeout` ใน cleanup) + `Recipes.jsx` ส่ง `debouncedQ` เข้า URL ของ API เท่านั้น — input ยัง bind `value={q}` |
| Lab B · not found (15%) | `pages/RecipeDetail.jsx` — `data?.meals?.[0]` แล้ว `if (!meal)` |
| Twist ข้อ 1 (back ไม่ย้อนทีละตัว) | `{ replace: true }` ใน `Recipes.jsx` · `hooks/useDebounce.js` หน่วงแค่การยิง API |

## วิธีตรวจหน้างาน (1 นาทีต่อกลุ่ม)

1. Network tab → กดเมนู 3 อัน → ต้องไม่มี request document ใหม่
2. พิมพ์ `/asdf` → 404 มี Nav อยู่ด้วย (ถ้า Nav หาย = `NotFound` ไม่ได้อยู่ใต้ Layout — ยังผ่าน Lab A แต่แจ้งกลุ่ม)
3. ค้นหา `chicken` → copy URL → แท็บใหม่ → ช่องค้นหาต้อง pre-fill
4. พิมพ์ค้นหา 4–5 ตัว → กด back 1 ครั้ง → ต้องออกจากหน้าค้นหา ไม่ใช่ลบทีละตัว
5. `/recipes/52772` พิมพ์ตรง · `/recipes/99999` → "ไม่พบสูตรนี้"
6. Network tab filter `search.php` → พิมพ์ `chicken` รัว ๆ → ต้องมี request **1 ครั้ง** · ช่อง input ไม่หน่วง

## ต่างจาก `lab-day-04-start` ตรงไหน

ทุกไฟล์ใน `src/components/` และ `src/pages/` มีเนื้อหาเต็ม · `main.jsx`/`App.jsx` ต่อ router แล้ว · เพิ่ม `hooks/useDebounce.js` — `hooks/useFetch.js`, `vite.config.js`, `index.css` เหมือนกันทุกตัวอักษร · `mockup-recipe-browser.*` อยู่ฝั่ง `-start` เท่านั้น
