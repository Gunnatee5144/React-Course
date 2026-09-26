# `react-spa-day04-solution/` — แอป React SPA ของวันที่ 4 ที่ build แล้ว

ใช้ในบล็อก **1.1 (สาธิตความเจ็บ)** ของ [`../../../../live-coding/day-06.md`](../../../../live-coding/day-06.md) — เปิด production build ของ SPA แล้ว View Page Source ให้ห้องเห็นว่า HTML ที่ server ส่งมาว่างเปล่า

`dist/` ที่อยู่ในนี้ **build ไว้ให้แล้ว** (ต่างจากโฟลเดอร์อื่นในคอร์สที่ `dist/` ถูก gitignore) เพราะสคริปต์ต้องใช้สาธิตสดต้นคาบ — ไม่ต้องรอ build หน้างาน

```bash
npx serve dist        # เปิด http://localhost:3000
```

> ⚠️ `npx serve` ใช้พอร์ต 3000 ชนกับ `next dev` — ถ้าเปิดค้างไว้ทั้งคู่ ให้ `npx serve dist -l 4000`

**สิ่งที่ต้องเห็นตอน Ctrl+U / View Page Source:**

```html
<body>
  <div id="root"></div>     ← ว่าง ไม่มีชื่อสูตรอาหารสักบรรทัด
</body>
```

## build ใหม่เมื่อไหร่

`dist/` นี้คือผลของ `npm run build` จาก [`../../../day-04/lab-day-04-final`](../../../day-04/lab-day-04-final) (เฉลย Lab วันที่ 4) — ถ้าแก้โค้ดวันที่ 4 แล้วอยากให้ตรงกัน:

```bash
cd ../../../day-04/lab-day-04-final
npm install && npm run build
rm -rf ../../day-06/lecture-day-06-start/react-spa-day04-solution/dist
cp -R dist ../../day-06/lecture-day-06-start/react-spa-day04-solution/dist
```

> ชื่อไฟล์ใน `dist/assets/` มี hash เปลี่ยนทุกครั้งที่ build — เป็นเรื่องปกติ ไม่ต้องแก้อะไรตาม
