import { z } from 'zod'

export const checkoutSchema = z.object({
  name: z.string().min(2, "ชื่อต้องอย่างน้อย 2 ตัวอักษร").max(50, "ชื่อยาวเกินไป"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  phone: z.string().regex(/^0\d{9}$/, "เบอร์โทรต้องเป็นตัวเลข 10 หลัก ขึ้นต้นด้วย 0"),
  address: z.string().min(10, "ที่อยู่สั้นเกินไป"),
})
