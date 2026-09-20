import { z } from 'zod'
import { DEPARTMENTS } from '../data/rooms.js'

export const bookingSchema = z
  .object({
    bookerName: z.string().trim().min(1, 'กรุณากรอกชื่อผู้จอง'),
    department: z
      .string()
      .min(1, 'กรุณาเลือกแผนก')
      .refine((v) => DEPARTMENTS.includes(v), { message: 'กรุณาเลือกแผนก' }),
    email: z.string().trim().min(1, 'กรุณากรอกอีเมล').email('อีเมลไม่ถูกต้อง'),
    confirmEmail: z.string().trim().min(1, 'กรุณายืนยันอีเมล').email('อีเมลไม่ถูกต้อง'),
    purpose: z.string().trim().min(10, 'อธิบายวัตถุประสงค์อย่างน้อย 10 ตัวอักษร'),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'อีเมลไม่ตรงกัน',
    path: ['confirmEmail'],
  })
