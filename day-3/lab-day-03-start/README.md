# `lab-day-03-start` — โปรเจกต์ตั้งต้นของแล็บบ่าย วันที่ 3

โครงตั้งต้นสำหรับ **Lab วันที่ 3 — 🎯 มินิแอป #1: GitHub User Browser** (13:00–15:00)
โจทย์เต็มอยู่ที่ `labs/day-03.md` ที่อาจารย์แจก — ไฟล์นี้คือ**ที่ที่ต้องเขียนโค้ดและส่งงาน**

> 🔴 **ลำดับสำคัญมาก: Lab A ทำกับข้อมูล static ก่อน แล้ว Lab B ค่อยเปลี่ยนไป API จริง** — ใครกระโดดไป API เลยจะ debug ไม่ออกว่าปัญหาอยู่ที่ตัวกรองหรือที่ fetch
> 🎯 **มินิแอปหมุดหมายชิ้นที่ 1 จาก 5** — คะแนนแล็บวันนี้คูณ **×1.5**

ต่อ Vite + React 19 + **Tailwind CSS v4** (ผ่าน `@tailwindcss/vite` — ไม่มี `tailwind.config.js`) ไว้ให้แล้ว
`src/components/UserCard.jsx` และ `src/components/FilterBar.jsx` **ว่างไว้ตั้งใจ** — เขียนเองใน Lab A · `src/hooks/` ว่างไว้ — Lab B ค่อยสร้าง `useFetch.js` เอง

---

## เริ่มยังไง

```bash
npm install     # ครั้งแรกครั้งเดียว (ถ้าแตกจาก zip ที่มี node_modules แล้ว ข้ามได้)
npm run dev     # เปิด http://localhost:5173
```

| ปัญหา | ทางแก้ |
|---|---|
| port 5173 ชนกับคนข้าง ๆ | `Ctrl+C` แล้ว `npm run dev -- --port 5174` |
| Tailwind ไม่ทำงาน (กล่องไม่มีขอบมน/ไม่มีเงา) | เช็ก `src/index.css` มี `@import "tailwindcss";` + `vite.config.js` มี `tailwindcss()` แล้ว **restart `npm run dev`** (ไฟล์ config ไม่ hot-reload) |
| จอขาว | เปิด Console — ดูว่า `useState`/`useEffect` ถูก `import` ครบไหม |

---

## ⚠️ GitHub REST API — rate limit ของ Lab B

`https://api.github.com/users/{username}` — **unauthenticated rate limit = 60 ครั้ง/ชั่วโมง ต่อ IP** และห้องทั้งห้องมักแชร์ NAT เดียวกัน **ถ้ายิงทุกตัวอักษรที่พิมพ์ ทั้งห้องจะโดนบล็อกภายในไม่กี่นาที** — นี่คือเหตุผลที่ Lab B บังคับให้ยิงตอนกด submit เท่านั้น ห้าม fetch ผูกกับ `onChange` ของ input ตรง ๆ

ถ้าโดน rate limit หรือ API ล่มระหว่างแล็บ/ตอนเกรด: สลับไปใช้ `github-mock.json` ที่แจกไว้ (โครง response หน้าตาตรงกับ `/users/{username}` เป๊ะ) แก้แค่ `BASE_URL` จุดเดียว — **TA ประกาศเวลาสลับพร้อมกันทั้งห้อง ไม่ปล่อยให้แต่ละกลุ่มแก้เอง**

---

## 🚫 AI Policy วันนี้ — วันสุดท้ายของ 3 วันที่ห้าม

**ห้ามใช้ AI generate โค้ดเด็ดขาด** ระหว่างแล็บ — ChatGPT, Copilot, Claude หรือเครื่องมือใดก็ตาม
**ปิด/ถอน extension AI ทุกตัวก่อนเริ่ม Lab A** — พรุ่งนี้ (วันที่ 4) เริ่มใช้ AI ได้ตามกติกาปกติ

---

## เกณฑ์ให้คะแนนวันนี้

**Lab A (pass/fail — ต้องผ่านครบทุกข้อ = ได้เต็ม 60% ของวันนี้ ไม่ผ่านแม้ข้อเดียว = 0)**
- [ ] list render ด้วย `.map()` มี `key` ที่ไม่ใช่ index (ยกเว้นอธิบายเหตุผลได้)
- [ ] search + filter ทำงานถูกต้องตามโจทย์
- [ ] มี empty state เมื่อไม่พบผลลัพธ์

**Lab B (คุณภาพ — คิดเป็นสัดส่วนใน 40% ที่เหลือของวันนี้)**
- เปลี่ยนเป็น API จริงพร้อม 3 สถานะครบ (loading/error/empty) — **40%**
- แยก fetch logic เป็น custom hook `useFetch` ที่ reusable จริง — **40%**
- จัดการ cleanup/stale response เบื้องต้น — **20%**

---

## ไฟล์ที่ต้องเขียน

```
src/
├── App.jsx                    ← ต่อจากที่มีอยู่: ต่อ FilterBar/UserCard เข้ามา (Lab A) แล้วเขียนใหม่ (Lab B)
├── data/users.js              ← มีให้แล้ว 18 คน (3 คนไม่มี followers โดยตั้งใจ)
├── components/
│   ├── UserCard.jsx           ← Lab A — เขียนเอง
│   └── FilterBar.jsx          ← Lab A — เขียนเอง
└── hooks/
    └── useFetch.js            ← Lab B — สร้างไฟล์นี้เอง (โฟลเดอร์เตรียมว่างไว้ให้แล้ว)
```

### Lab A (13:00–13:55) — เช็กก่อนส่ง

- [ ] แสดงเป็น **grid** (มือถือ 1 คอลัมน์ · จอใหญ่ 3–4 คอลัมน์) — การ์ดละ avatar + login + bio + follower count
- [ ] **ช่องค้นหา** ตาม `login` หรือ `name` (ไม่สนตัวพิมพ์เล็ก/ใหญ่)
- [ ] **filter ตาม "ผู้ติดตามขั้นต่ำ"** (number input สร้างจากค่าจริง ไม่ hardcode ช่วง)
- [ ] **นับ "พบ X รายการ"** ต้องตรงกับจำนวนการ์ดจริง
- [ ] 🔴 **empty state + ปุ่มล้างตัวกรอง**
- [ ] 🔴 **3 คนที่ไม่มี `followers` ต้องไม่ขึ้น `NaN`/`undefined`** (แสดง "ยังไม่ทราบจำนวนผู้ติดตาม")

### Lab B (14:00–14:50) — เช็กก่อนส่ง

- [ ] b-1: แยก state "ที่พิมพ์อยู่" (`input`) กับ "ที่ยืนยันค้นหาแล้ว" (`username`) — ห้าม fetch ผูกกับ `onChange` ตรง ๆ
- [ ] b-2: เขียน `src/hooks/useFetch.js` เอง (ไม่ copy-paste จากสไลด์เช้านี้ตรง ๆ) คืนค่าอย่างน้อย `{ data, loading, error }` ใช้ได้กับ URL ไหนก็ได้
- [ ] b-3: ครบ 3 สถานะ — empty (ยังไม่กด submit) / loading / error (404 หรือ 403 → ข้อความอ่านรู้เรื่อง + ปุ่ม "ลองใหม่")
- [ ] b-4: มี `cancelled` flag หรือ `AbortController` กัน race condition — ทดสอบ `torvalds` แล้วรีบเปลี่ยนไป `octocat` ก่อนอันแรกตอบกลับ ต้องจบที่ `octocat`

---

By login name

GET /users?login=octocat       # exact match
GET /users?login_like=oct         # partial match / "contains" (case-sensitive regex)

By followers (it's a number field)

GET /users?followers=98000        # exact
GET /users?followers_gte=50000    # 50k or more
GET /users?followers_lte=20000    # 20k or under
GET /users?followers_gte=20000&followers_lte=100000   # range
GET /users?_sort=followers&_order=desc   # sort by followers, highest first


Backend API URL 
https://mock-server-xi-one.vercel.app

combine
/users?login_like=oct&followers_gte=50000

<!-- รายชื่อสมาชิก -->
682110160 กันธีภพ ปันพรม
682110161 กันต์ธีร์ วารีสอาด
682110193 ศรัณย์ กระจ่างแก้ว