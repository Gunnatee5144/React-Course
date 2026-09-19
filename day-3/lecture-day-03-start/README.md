# `lecture-day-03-start` — โปรเจกต์ประกอบเลกเชอร์ วันที่ 3

server: https://mock-server-xi-one.vercel.app/

โครงสำหรับ **live-coding วันที่ 3 (Lists, Keys, useEffect & Custom Hooks)**
คู่กับสคริปต์ `live-coding/day-03.md` — `RepoList.jsx` / `BuggyList.jsx` / `hooks/useFetch.js` **ตั้งใจปล่อยว่างไว้** เพราะต้องพิมพ์สดในคาบ

`App.jsx` ตอนเริ่มคาบเป็นแค่ placeholder — บล็อก 1.1 (09:00) เริ่มต่อด้วย `<RepoList repos={repos} />` แล้วค่อย ๆ ขยาย/เขียนทับตลอดคาบตามสคริปต์

ต่อ Vite + React 19 + **Tailwind CSS v4** (ผ่าน `@tailwindcss/vite` — ไม่มี `tailwind.config.js`) ไว้ให้แล้ว

---

## คำสั่งที่ใช้

```bash
npm install     # ครั้งแรกครั้งเดียว (ถ้าแตกจาก zip ที่มี node_modules แล้ว ข้ามได้)
npm run dev     # เปิด http://localhost:5173
```

| ปัญหา                              | ทางแก้                                                                                                                                             |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| port 5173 ชนกับคนข้าง ๆ            | `Ctrl+C` แล้ว `npm run dev -- --port 5174`                                                                                                         |
| ตัวหนังสือไม่เปลี่ยนสีตาม Tailwind | เช็ก `src/index.css` มี `@import "tailwindcss";` + `vite.config.js` มี `tailwindcss()` แล้ว **restart `npm run dev`** (ไฟล์ config ไม่ hot-reload) |
| จอขาว                              | เปิด Console — ดูว่า `useState`/`useEffect` ถูก `import` ครบไหม หรือลืมปิด tag                                                                     |

---

## ⚠️ GitHub REST API — rate limit วันนี้สำคัญมาก

บล็อก 2.3 เป็นต้นไปยิง `https://api.github.com/users/{username}` จริง — **unauthenticated rate limit = 60 ครั้ง/ชั่วโมง ต่อ IP** และห้องส่วนใหญ่แชร์ NAT เดียวกัน (เน็ตห้องเดียวกันหมด) **ทดสอบยิงจากเน็ตห้องจริงล่วงหน้าตอนซ้อม ไม่ใช่แค่จากมือถือ/บ้าน**

ถ้าโดน rate limit หรือ API ล่มระหว่างสาธิต มี `db.json` (18 users เดียวกับที่ใช้ใน `labs/day-03.md` — โครง response หน้าตาตรงกับ `/users/{username}` เป๊ะ รวม 3 คนที่ไม่มี `followers` โดยตั้งใจ) เตรียมไว้เป็นสำรอง:

```bash
npm run mock    # เปิด json-server ที่ http://localhost:3001 (แยก terminal จาก npm run dev)
```

แล้วแก้บรรทัดที่ยิง `fetch` ใน `App.jsx`/`useFetch.js` จาก `https://api.github.com/users/${username}` เป็น `http://localhost:3001/users/${username}` จุดเดียว — response shape เหมือนเดิมทุกฟิลด์ ไม่ต้องแก้โค้ดส่วนอื่น

**ทดสอบว่า mock ใช้ได้จริง:** `curl http://localhost:3001/users/octocat` ต้องได้ JSON กลับมา · user ที่ไม่มีจริง (เช่น `curl http://localhost:3001/users/nosuchuser`) ต้องได้ `404` เหมือนพฤติกรรมจริงของ GitHub API

**ถ้าอยากได้ URL ที่ไม่ต้องรันเครื่องตัวเอง** (กันเน็ตห้อง/เครื่องมีปัญหาระหว่างสอน) — `../mock-server/` เป็นโปรเจกต์เดียวกันแต่แพ็กแยกไว้ deploy ขึ้น Render/Railway ฯลฯ ได้จริง ดูวิธีที่ `../mock-server/README.md`

---

## 🚫 AI Policy วันนี้ — วันสุดท้ายของ 3 วันที่ห้าม


วันนี้จบ Phase 0 — สิ่งที่ฝึกมือวันนี้ (`key`, `useEffect`, custom hook) ต้องใช้ซ้ำได้ตลอดคอร์สที่เหลือ ถ้าให้ AI เขียนแทน จะไม่ "รู้สึก" กับกับดักที่ตั้งไว้ (บั๊ก `key={index}`, infinite loop จาก `useEffect`)

---

## 6 ไฟล์ที่จะเพิ่ม/แก้วันนี้

| ไฟล์                                | เขียนตอนไหน | สาระ                                                         |
| ----------------------------------- | ----------- | ------------------------------------------------------------ |
| `src/RepoList.jsx`                  | 1.1         | `.map()` คืน JSX                                             |
| `src/BuggyList.jsx`                 | 1.2 → 1.3   | บั๊ก `key={index}` สาธิตสด แล้วแก้เป็น `key={item.id}`       |
| `src/App.jsx` (รอบที่ 1)            | 1.4 → 1.6   | conditional rendering, empty state, ตัวกรองหลายตัว + `?? 0`  |
| `src/App.jsx` (รอบที่ 2 — เขียนทับ) | 2.1 → 2.4   | `useEffect`, dependency array, fetch จริง + 3 สถานะ, cleanup |
| `src/hooks/useFetch.js`             | 2.6         | ดึง fetch logic ออกมาเป็น custom hook                        |

> ⚠️ `App.jsx` ถูกเขียนทับ 2 รอบในคาบเดียว — รอบแรก (1.4–1.6) เป็น demo กรอง repo, รอบสอง (2.1 เป็นต้นไป) เขียนใหม่เป็นแอปค้นหา GitHub user ตามสคริปต์ ไม่ใช่บั๊ก

---

## ไฟล์อ้างอิงอื่น

- `src/data/repos.js` — เตรียมไว้ให้แล้ว 18 รายการ (3 รายการไม่มี `stars` โดยตั้งใจ ใช้สาธิตกับดัก `?? 0` ในบล็อก 1.6)
- `db.json` — mock สำรองกรณี GitHub API ล่ม/โดน rate limit ระหว่างสาธิต
- `../lecture-day-03-final/` — โค้ดปลายทางตอน ✅ เช็กพร้อมกัน #4 (11:55) **สำหรับอาจารย์/TA เท่านั้น ห้ามแจกก่อนจบคาบ**
