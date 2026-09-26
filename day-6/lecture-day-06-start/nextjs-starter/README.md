# `nextjs-starter` — โปรเจกต์ตั้งต้นเลกเชอร์เช้าวันที่ 6

`create-next-app` 15 (App Router · Tailwind CSS v4 · ESLint · **JavaScript ไม่ใช่ TypeScript**) — Node ≥ 20

```bash
npm install     # ถ้าได้ zip ที่มี node_modules มาแล้ว ข้ามได้
npm run dev     # http://localhost:3000
```

| ไฟล์ | สถานะ |
|---|---|
| `app/layout.js` · `app/page.js` | ของ create-next-app — แก้สดในบล็อก 1.3 |
| `app/loading.js` · `app/error.js` · `app/not-found.js` | มีให้แล้ว |
| `app/movies/layout.js` · `app/movies/[id]/page.js` | โครงว่าง — พิมพ์ตามในบล็อก 1.4 |
| `data/movies.json` | หนัง Ghibli 22 เรื่อง — สำรองกรณี Ghibli API ล่ม (ชุดเดียวกับ `../../mock-server/db.json`) |

🚫 **เช้านี้ปิด AI generate โค้ด (Copilot/ChatGPT/Claude และ inline suggestion) จนถึงพักเที่ยง**
