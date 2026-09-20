// R6: zod schema ฟอร์มลงทะเบียนทีม
// รับชื่อ Pokemon ในทีมปัจจุบันเข้ามา เพื่อเช็กว่าชื่อทีมห้ามซ้ำกับชื่อ Pokemon ตัวใดในทีม
import { z } from 'zod'

export function createRegistrationSchema(teamMemberNames = []) {
  const lowerNames = teamMemberNames.map((n) => n.toLowerCase())

  return z
    .object({
      trainerName: z
        .string()
        .trim()
        .min(2, 'ชื่อเทรนเนอร์ต้องมีอย่างน้อย 2 ตัวอักษร')
        .max(30, 'ชื่อเทรนเนอร์ต้องไม่เกิน 30 ตัวอักษร'),
      teamName: z
        .string()
        .trim()
        .min(3, 'ชื่อทีมต้องมีอย่างน้อย 3 ตัวอักษร')
        .max(20, 'ชื่อทีมต้องไม่เกิน 20 ตัวอักษร')
        .regex(/^[A-Za-z0-9 ]+$/, 'ชื่อทีมใช้ได้แค่ A-Z a-z 0-9 และช่องว่าง')
        .refine((name) => !lowerNames.includes(name.toLowerCase()), {
          message: 'ชื่อทีมห้ามซ้ำกับชื่อ Pokemon ตัวใดในทีม',
        }),
      email: z.string().trim().email('รูปแบบอีเมลไม่ถูกต้อง'),
      confirmEmail: z.string().trim().email('รูปแบบอีเมลไม่ถูกต้อง'),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: 'อีเมลไม่ตรงกัน',
      path: ['confirmEmail'],
    })
}
