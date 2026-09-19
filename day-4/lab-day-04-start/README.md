# `lab-day-04-start` — โปรเจกต์ตั้งต้นของแล็บบ่าย วันที่ 4

โครงตั้งต้นสำหรับ **Lab วันที่ 4 — 🎯 มินิแอป #2: Recipe Browser (React Router)** (13:00–15:00)
โจทย์เต็มอยู่ที่ `labs/day-04.md` — ไฟล์นี้คือ**ที่ที่ต้องเขียนโค้ดและส่งงาน** · หน้าตาเป้าหมายดู `mockup-recipe-browser.png`

> 🎯 **มินิแอปหมุดหมายชิ้นที่ 2 จาก 5** — คะแนนแล็บวันนี้คูณ **×1.5**
> 🔓 **ใช้ AI ช่วยได้แล้ว** — แต่ต้องอธิบายได้ว่าใช้ตรงไหน ถามอะไร เมื่อ TA ถาม
> ⚠️ **ไม่มี deploy วันนี้** — ย้ายไปวันที่ 8

ต่อ Vite + React 19 + Tailwind CSS v4 + `react-router-dom` ไว้ให้แล้ว
`src/hooks/useFetch.js` **มีให้แล้ว** (ของวันที่ 3) · ไฟล์ใน `src/components/` และ `src/pages/` **ว่างไว้ตั้งใจ** — มีแค่คอมเมนต์บอกว่าต้องเขียนอะไร

---

## เริ่มยังไง

```bash
npm install
npm run dev     # http://localhost:5173
```

| ปัญหา | ทางแก้ |
|---|---|
| จอขาว `useRoutes() may be used only in the context of a <Router>` | ลืม `<BrowserRouter>` ที่ `main.jsx` |
| หน้าว่าง/`does not provide an export named 'default'` | ไฟล์หน้านั้นยังว่างอยู่ — เขียน component + `export default` ก่อน import |
| port 5173 ชนกับคนข้าง ๆ | `npm run dev -- --port 5174` |

---

## API — TheMealDB (ฟรี ไม่ต้องใช้ key)

```
Lab A  รายการ:     https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert
Lab B  รายละเอียด:  https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
Lab B  ค้นหา:      https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
```

⚠️ หาไม่เจอจะได้ `{ "meals": null }` + HTTP 200 — **ไม่ใช่ 404**

---

## เกณฑ์ให้คะแนนวันนี้

**Lab A (pass/fail — ผ่านครบทุกข้อ = 60% · ไม่ผ่านแม้ข้อเดียว = 0)**
- [ ] มี layout route ที่ nav ใช้ร่วมกันทุกหน้าจริง (ไม่ copy nav ซ้ำ)
- [ ] เปลี่ยนหน้าแบบ SPA ไม่ reload ทั้งหน้า
- [ ] มี 404 route ที่ทำงานจริง

**Lab B (คุณภาพ — 40%)**
- dynamic route `:id` ดึงข้อมูลตรงตาม id ถูกต้อง — **40%**
- query string search sync กับ UI สองทาง — **40%**
- จัดการกรณี id ไม่มีอยู่จริง (not found) — **20%**

---

## ไฟล์ที่ต้องเขียน

```
src/
├── main.jsx                  ← Lab A: ครอบ <BrowserRouter>
├── App.jsx                   ← Lab A: <Routes> nested ใต้ Layout · Lab B: เพิ่ม recipes/:id
├── components/
│   ├── Layout.jsx            ← Lab A: Nav + <Outlet /> + footer
│   └── Nav.jsx               ← Lab A: NavLink 3 อัน (+ end ที่หน้าแรก)
├── pages/
│   ├── Home.jsx              ← Lab A
│   ├── Recipes.jsx           ← Lab A: list + 3 สถานะ · Lab B (B2): useSearchParams
│   ├── RecipeDetail.jsx      ← Lab B (B1): useParams + ไม่พบสูตร
│   ├── About.jsx             ← Lab A
│   └── NotFound.jsx          ← Lab A
└── hooks/
    └── useFetch.js           ← มีให้แล้ว ใช้ต่อได้เลย
```

### ก่อนส่ง — Twist ที่ TA จะลองกับเครื่องคุณ

- [ ] copy `/recipes?q=chicken` ไปเปิดแท็บใหม่ → ช่องค้นหาขึ้น "chicken" + ผลลัพธ์ตรงทันที
- [ ] พิมพ์ค้นหาแล้วกด back → กลับหน้าก่อนค้นหา **ไม่ย้อนทีละตัวอักษร**
- [ ] พิมพ์ `/recipes/52772` ตรง ๆ ในแถบที่อยู่ → ได้หน้าเดิมเป๊ะ
- [ ] `/recipes/99999` → "ไม่พบสูตรนี้" ไม่ใช่จอขาว

<!-- รายชื่อสมาชิก -->
682110161 กันต์ธีร์ วารีสอาด
682110193 ศรัณย์ กระจ่างแก้ว
682110195 ศุภวิชญ์ ชัยรัตน์