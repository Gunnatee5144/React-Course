# การ์ดตัดสินใจ Server vs Client — 8 ใบ (บล็อก 2.5 · 🖐 ลองเอง #12)

> แทน `decision-framework-cards.pdf` ในโครงไฟล์ของสคริปต์ — เนื้อหาคัดจากตารางใน `live-coding/day-06.md` บล็อก 2.5 **ตรงตัว** แก้ที่สคริปต์ก่อนเสมอ
> ปรินต์/ฉาย **หน้าการ์ด** ก่อน (ไม่มีคำตอบ) · เฉลยอยู่ท้ายไฟล์ — ห้ามฉายพร้อมกัน

## คำถาม 3 ข้อ (flowchart บนกระดาน)

```
ต้องมี interactivity ไหม? (state, onClick, onChange, useEffect)
├── ใช่ → Client Component ("use client")
└── ไม่ใช่ → ต้องใช้ browser-only API ไหม? (localStorage, window, geolocation)
             ├── ใช่ → Client Component
             └── ไม่ใช่ → ต้องเข้าถึงข้อมูล/secret ฝั่ง server โดยตรงไหม? (API key ลับ, query DB ตรง ๆ)
                          ├── ใช่ → ต้องเป็น Server Component (ห้ามย้ายไป Client เด็ดขาด)
                          └── ไม่ใช่ → ค่าเริ่มต้น: Server Component (เบากว่า เร็วกว่า)
```

---

## หน้าการ์ด (ฉาย/แจก)

| # | Component | คำใบ้ | Server หรือ Client? |
|---|---|---|---|
| 1 | `<LikeButton />` | ปุ่ม 🤍 ในหน้า `/movies` ที่เพิ่งเขียน — `onClick` + state | |
| 2 | `<MovieList />` | `await fetch("…/films")` แล้ว map ชื่อเรื่อง ไม่มี interaction | |
| 3 | `<SearchBox />` | ช่องค้นหาชื่อหนัง controlled input มี `onChange` | |
| 4 | `<Footer />` | "© 2026 DII · ข้อมูลจาก Studio Ghibli API" static ล้วน | |
| 5 | `<RecentlyViewed />` | อ่านรายชื่อหนังที่เพิ่งเปิดจาก `localStorage` | |
| 6 | `<MovieSynopsis />` | แสดง `description` ที่ fetch มาจาก API ไม่มี interaction | |
| 7 | `<ReviewForm />` | ฟอร์มเขียนรีวิวหนัง มี validation state ในตัว | |
| 8 | `<TicketPrice />` | เรียก API ราคาตั๋วภายในด้วย **API key ลับ** | |

> ทุกใบอยู่ในบริบท **แอปหนังที่ทำด้วยกันเช้านี้** — ใบ 1–2 คือของที่เพิ่งเขียนจริง ที่เหลือคือ "ถ้าจะทำต่อ"

<div style="page-break-after: always"></div>

---

## เฉลย (อาจารย์)

| # | Component | คำตอบ |
|---|---|---|
| 1 | `<LikeButton />` | Client |
| 2 | `<MovieList />` | Server |
| 3 | `<SearchBox />` | Client |
| 4 | `<Footer />` | Server |
| 5 | `<RecentlyViewed />` | Client |
| 6 | `<MovieSynopsis />` | Server |
| 7 | `<ReviewForm />` | Client |
| 8 | `<TicketPrice />` | Server (ห้ามย้าย) |

🎤 ข้อ 8 ต้องเน้นที่สุด — แตะของลับ ห้ามย้ายไป Client เด็ดขาด ให้ Server Component คำนวณด้วย secret แล้วส่งเฉพาะ "ผลลัพธ์" (ราคาสุดท้าย) ไปให้ Client Component แสดงผล
