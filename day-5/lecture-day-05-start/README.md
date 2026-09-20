# `lecture-day-05-start` — โปรเจกต์ประกอบเลกเชอร์ วันที่ 5

โครงสำหรับ **live-coding วันที่ 5 (Global State, Validation & Performance)** คู่กับสคริปต์ `live-coding/day-05.md`

> 👀 **วันนี้เน้น "ดู" มากกว่า "พิมพ์"** — ไฟล์ส่วนใหญ่เขียนไว้ให้แล้ว อาจารย์เปิดอธิบายบนจอ
> ⌨️ **พิมพ์ตามแค่ 5 จุด** — ทุกจุดมีคอมเมนต์ `⌨️ พิมพ์ตาม #N` ในไฟล์แล้ว (ค้นด้วย Ctrl+Shift+F คำว่า "พิมพ์ตาม")
> 📣 **Assignment 1 (React SPA) แจกวันนี้** — ส่งเสาร์ 26 ก.ย. 69 ก่อน 09:00

ต่อ Vite + React 19 + Tailwind CSS v4 + `react-router-dom` + `react-hook-form` + `zod` + `@hookform/resolvers` ไว้ให้แล้ว

---

## คำสั่งที่ใช้

```bash
npm install
npm run dev     # http://localhost:5173
```

| หน้า | ใช้ตอน |
|---|---|
| `/` ร้านค้า | ช่วง 1 — prop drilling → Context → ตะกร้า |
| `/perf` memo demo | 2.3 — `memo` / `useCallback` / `useMemo` |
| `/checkout` ชำระเงิน | 2.4–2.5 — react-hook-form + zod |

> ⚠️ **อย่าเพิ่งกดเมนู "memo demo" / "ชำระเงิน" ก่อนพิมพ์ตาม #2** — 2 หน้านั้นเรียก `useCart()` ซึ่งยังเป็นแค่ stub ที่ throw error (จอขาว + Console บอก "ยังไม่ได้เขียน useCart()") กลับหน้าแรกแล้ว refresh ได้

| ปัญหา | ทางแก้ |
|---|---|
| Console `useCart must be used within CartProvider` | ลืมครอบ `<CartProvider>` ที่ `main.jsx` (#1) |
| `Cannot destructure property ... of 'null'` | ยังเรียก `useContext(CartContext)` ตรง ๆ และอยู่นอก Provider |
| กดสั่งซื้อแล้วหน้า refresh | ยังไม่ได้ครอบ `handleSubmit(onSubmit)` (#5) |
| กด "ลด" แล้วค้างที่ 0 | เงื่อนไข `i.qty > 1 ? ... : []` ใน `flatMap` (#3) |

---

## ⌨️ 5 จุดที่พิมพ์ตาม (ที่เหลือดูอย่างเดียว)

| # | บล็อก | ไฟล์ | พิมพ์อะไร |
|:--:|---|---|---|
| 1 | 1.3 | `context/CartContext.jsx` + `main.jsx` | `createContext` · `<CartContext.Provider>` · ครอบ `<CartProvider>` |
| 2 | 1.4 | `CartContext.jsx` + `AddToCartButton.jsx` + ลบ props 4 ไฟล์ | `useCart()` + guard · ลบ `cart`/`addToCart` ออกจาก `App` → `ProductCard` |
| 3 | 1.5 | `CartContext.jsx` + `App.jsx` | `removeItem` / `decreaseItem` / `clear` / ยอดรวม · เปิด `<CartDrawer />` |
| 4 | 2.3 | `components/ProductList.jsx` | ห่อ `memo(...)` + `useCallback` |
| 5 | 2.4 | `components/CheckoutForm.jsx` | `useForm` + `zodResolver` · `handleSubmit` · `{...register()}` 4 ช่อง |

## 👀 ที่มีให้แล้ว — ดูอย่างเดียว

| ไฟล์ / เรื่อง | ตอน |
|---|---|
| `App` → `ShopPage` → `ProductGrid` → `ProductCard` → `AddToCartButton` | 1.1–1.2 prop drilling 4 ชั้นโดยจงใจ + lifting state |
| `addItem` ใน `CartContext.jsx` | 1.3 — ย้ายมาจาก `App.jsx` ให้แล้ว |
| `components/CartDrawer.jsx` | 1.5 |
| `../redux-zustand-demo/` | 2.1 — สนิปเป็ต ไม่ต้องรัน |
| `useMemo` ใน `ProductList.jsx` | 2.3 — อาจารย์ทำให้ดู |
| `schemas/checkout.js` | 2.4 — schema zod เขียนไว้แล้ว |
| สลับ `mode` `onChange` ↔ `onTouched` | 2.5 — 🖐 ลองแก้คำเดียว |

- `../lecture-day-05-final/` — ปลายทาง ✅ #4 (11:40) **อาจารย์/TA เท่านั้น**
