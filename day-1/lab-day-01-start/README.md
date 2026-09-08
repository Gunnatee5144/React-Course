# `lab-day-01-start` — โปรเจกต์ตั้งต้นของแล็บบ่าย วันที่ 1

## เกณฑ์ให้คะแนนวันนี้

**Lab A (pass/fail — ต้องผ่านครบทุกข้อ = ได้เต็ม 60% ของวันนี้ ไม่ผ่านแม้ข้อเดียว = 0)**

**Lab B (คุณภาพ — คิดเป็นสัดส่วนใน 40% ที่เหลือของวันนี้)**

- ความถูกต้องของ variant/theming ตาม props ที่เพิ่ม — **50%**
- โค้ดสะอาด ไม่ซ้ำซ้อน (DRY) — **25%**
- ตั้งชื่อ props/component สื่อความหมาย — **25%**

---

## ภาพโจทย์

`mockup-team-directory.png` — หน้าตาที่ต้องทำให้ได้ (ต้นฉบับคือ `mockup-team-directory.html` เปิดในเบราว์เซอร์เพื่อซูมดูรายละเอียดได้)

---

## ไฟล์ที่ต้องเขียน

```
src/
├── App.jsx                 ← ลบของเดิมทิ้ง แล้วประกอบ Layout + grid ของ ProfileCard
├── components/
│   ├── Layout.jsx          ← header + container  (ต้องใช้ children)
│   ├── ProfileCard.jsx     ← การ์ดพนักงาน 1 ใบ
│   ├── Badge.jsx           ← ป้ายสถานะ  (ต้องรับ children)
│   └── Avatar.jsx          ← วงกลมตัวอักษรย่อชื่อ
└── data/users.js           ← มีให้แล้ว 6 คน ไม่ต้องแก้
```

### Lab

- [ ] ทุกอย่างขับด้วย `users.js` array เดียว — ไม่มีชื่อ/ตำแหน่ง hardcode ใน JSX
- [ ] ใช้ `children` อย่างน้อย 1 ที่ (`<Badge>` และ/หรือ `<Layout>`)
- [ ] Tailwind grid 3 คอลัมน์บนจอใหญ่ / 1 คอลัมน์บนมือถือ
- [ ] `Avatar` แสดงตัวอักษรย่อถูกต้องทุกคน (ตัวแรกของชื่อ พิมพ์ใหญ่)
- [ ] คนที่ `isLead: true` การ์ดเด่นกว่าใบอื่น
- [ ] Console ไม่มี error และไม่มี warning เรื่อง `key`
- [ ] `<Badge variant="online" | "away" | "offline">` สีต่างกันจริง (เขียว/เหลือง/เทา)
- [ ] เพิ่ม `variant="lead"` (ม่วง) ได้โดยแก้แค่ **map เดียว** ไม่แตะ JSX ที่เรียก `<Badge>` ที่อื่น
- [ ] `<Avatar size="sm" | "md" | "lg">` ขนาดเปลี่ยนจริง
- [ ] `<Avatar color="blue" | "purple" | "emerald">` สีเปลี่ยนจริง
- [ ] `ProfileCard` ส่ง `size="lg"` + `color="purple"` เฉพาะคนที่ `isLead: true`

## `children` ต่างจาก prop ชื่อ `text` อย่างไร

`children` คือเนื้อหาที่เขียนไว้ระหว่างแท็กเปิดและแท็กปิด เช่น
`<Badge>ออนไลน์</Badge>` ทำให้ component รับได้ทั้งข้อความและ JSX ส่วน prop ชื่อ
`text` ต้องส่งแบบ `<Badge text="ออนไลน์" />` และจำกัดความหมายไว้ว่าเป็นข้อความ
