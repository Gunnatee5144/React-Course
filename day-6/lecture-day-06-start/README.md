# `lecture-day-06-start` — ของที่ต้องเตรียมก่อนเลกเชอร์เช้าวันที่ 6

เลกเชอร์ **วันที่ 6 — Next.js เริ่มต้น: App Router & Server vs Client Component** · สคริปต์เต็มอยู่ที่ `live-coding/day-06.md`
โครงโฟลเดอร์นี้ตรงกับหัวข้อ "ไฟล์เริ่มต้นที่ต้องเตรียม (`lecture-day-06-start`)" ท้ายสคริปต์

```
lecture-day-06-start/
├── react-spa-day04-solution/     ← dist/ build ไว้ให้แล้ว (ไม่ต้อง build หน้างาน) ใช้สาธิต view-source บล็อก 1.1
├── nextjs-starter/               ← create-next-app 15 (App Router · Tailwind v4 · ESLint · JavaScript ไม่ใช่ TS) — แจกนักศึกษา
│   ├── app/
│   │   ├── layout.js · page.js · globals.css   ← ของ create-next-app ไม่ได้แตะ (หน้า welcome ใช้ในบล็อก 1.2)
│   │   ├── loading.js            ← มีให้แล้ว + วิธีใส่ delay จำลองอยู่ในคอมเมนต์
│   │   ├── error.js              ← มีให้แล้ว มี "use client" บรรทัดแรก (ชี้ตอนบล็อก 1.3)
│   │   ├── not-found.js          ← มีให้แล้ว
│   │   └── movies/
│   │       ├── layout.js         ← ⌨️ โครงว่าง เติมสดบล็อก 1.4
│   │       └── [id]/page.js      ← ⌨️ โครงว่าง เติมสดบล็อก 1.4
│   ├── data/movies.json          ← หนัง Ghibli 22 เรื่อง สำรองชั้นที่ 2 กรณี Ghibli API ล่ม (บล็อก 2.1 / แผนสำรอง)
│   ├── package.json · next.config.mjs · eslint.config.mjs · postcss.config.mjs · jsconfig.json
├── decision-framework-cards.md   ← การ์ด 8 ใบของบล็อก 2.5 (ลองเอง #12) — แทน .pdf ในสคริปต์ ปรินต์/ฉายจากไฟล์นี้
└── README.md
```

> ⚠️ `movies/layout.js` กับ `movies/[id]/page.js` มี **บรรทัด `export default` สำรองไว้กันพัง** (`return children` / `return null`) นอกนั้นเป็นคอมเมนต์ล้วน — Next.js ไม่ยอม build ถ้าไฟล์ `layout.js`/`page.js` ไม่มี default export ตอนพิมพ์สดให้ลบบรรทัดนั้นทิ้งแล้วพิมพ์ของจริงแทน
> ⚠️ ไม่มี `app/movies/page.js` ใน starter (ตามสคริปต์) — `/movies` จะขึ้น 404 จนกว่าจะสร้างไฟล์นี้

เวอร์ชันที่ยืนยันด้วย `npm run build` แล้ว: **Node 20 · Next.js 15.5 · React 19.1 · Tailwind CSS v4** (`@tailwindcss/postcss` — ไม่มี `tailwind.config.js`)

---

## ก่อนเข้าคาบ (ตรงกับ "ก่อนเข้าคาบ" ในสคริปต์)

### 1) React SPA วันที่ 4 แบบ production — สาธิต view-source (บล็อก 1.1)

โค้ดไม่ได้ก็อปมาไว้ที่นี่ (จะได้ไม่มีสองสำเนาที่ต้อง sync) — build จากเฉลยแล็บวันที่ 4 ตรง ๆ:

```bash
cd react-spa-day04-solution
npx serve dist        # http://localhost:3000 — dist/ build ไว้ให้แล้ว ไม่ต้อง npm install
```

ถ้าแก้โค้ดเฉลยวันที่ 4 แล้วอยากให้ `dist/` ตรงกัน: วิธี build ใหม่อยู่ใน [`react-spa-day04-solution/README.md`](./react-spa-day04-solution/README.md)

- [ ] Ctrl+U / View Page Source ต้องเห็น `<div id="root"></div>` **ว่างจริง** (ทดสอบแล้ว — Vite วาง `<script type="module">` ไว้ใน `<head>` ไม่ใช่ท้าย `<body>` แบบในสไลด์ ใจความเหมือนกัน)
- [ ] `npx serve dist` ธรรมดา refresh ที่ `/recipes` จะได้ 404 ของ serve — สาธิตจากหน้า `/` แล้วคลิกไป หรือใช้ `npx serve -s dist`
- [ ] ⚠️ `serve` ใช้พอร์ต 3000 เหมือน `next dev` — ปิดก่อนเริ่มบล็อก 1.2 หรือรัน `npx serve dist -l 4000`

### 2) `nextjs-starter`

```bash
cd nextjs-starter
npm install
npm run dev        # http://localhost:3000 → หน้า welcome ของ Next.js
```

- [ ] รันผ่านแล้ว → **zip ทั้งโฟลเดอร์พร้อม `node_modules`** ใส่ USB 2 อัน (แผนสำรองกรณีเน็ตห้องช้า/npm ล่ม)
- [ ] `node -v` ≥ 20 ทุกเครื่อง
- [ ] ทดสอบ error ของบล็อก 2.2 ล่วงหน้าบนเครื่องตัวเอง — ข้อความจริงบน Next.js 15.5:
  ```
  You're importing a component that needs `useState`. This React Hook only works in a Client Component.
  To fix, mark the file (or its parent) with the `"use client"` directive.
  ```

### 3) การ์ดตัดสินใจ — `decision-framework-cards.md` (บล็อก 2.5)

### 4) 🚫 checklist นโยบาย AI เช้านี้ (บล็อก 0.0)

- [ ] ปิด Copilot / inline suggestion **ในเครื่องอาจารย์เอง** ก่อนขึ้นสอน
- [ ] ประกาศ 09:00–09:05 ด้วยน้ำหนักจริง — ปิด AI generate โค้ดทั้งห้อง **จนถึงพักเที่ยง** (ปิด extension ด้วย ไม่ใช่แค่ไม่เปิดแท็บ)
- [ ] บอกเหตุผล: AI หลายตัวสอน App Router/Server Component ผิด และห้องยังไม่มี mental model ไว้เช็ก
- [ ] บอกว่าบ่ายนี้กลับมาใช้ได้ (ยกเว้น Lab B ข้อ debug 10 นาทีแรก)
- [ ] TA เดินตรวจ เห็นแท็บ ChatGPT/Copilot ให้เตือนทันที

### 5) อื่น ๆ

- [ ] แบบฟอร์ม Final Project Proposal + ตัวอย่างที่กรอกแล้ว (`assignments/final-project.md` ข้อ 2) พร้อมแจกท้ายคาบ

---

## ปลายทางของคาบ

`../lecture-day-06-final/` — 🔴 อาจารย์/TA เท่านั้น จนจบคาบเช้า
