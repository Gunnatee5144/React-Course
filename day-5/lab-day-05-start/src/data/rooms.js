// ของที่ให้มา — ใช้ได้เลย ไม่มีคะแนนในไฟล์นี้

export const ROOM = { name: 'ห้องประชุม Innovation 4A', capacity: 12 }

export const DAYS = [
  { code: 'จ', label: 'จันทร์' },
  { code: 'อ', label: 'อังคาร' },
  { code: 'พ', label: 'พุธ' },
  { code: 'พฤ', label: 'พฤหัสบดี' },
  { code: 'ศ', label: 'ศุกร์' },
]

// 09:00–17:00 เว้นพักเที่ยง 12:00
export const HOURS = [9, 10, 11, 13, 14, 15, 16, 17]

// 🔴 นโยบายห้อง: จองได้ครั้งละไม่เกิน 4 ชั่วโมง และต้องเป็นวันเดียวกันทั้งหมด
export const MAX_HOURS = 4

export const DEPARTMENTS = ['DII', 'วิศวกรรม', 'บัญชี', 'การตลาด', 'ทรัพยากรบุคคล']

// ช่องที่ฝ่ายอื่นจองไปแล้ว — เลือกไม่ได้
export const BOOKED = ['จ-11', 'อ-09', 'อ-10', 'พ-14', 'พ-15', 'พฤ-13', 'ศ-16', 'ศ-17']

// 'จ' + 9  →  'จ-09'
export const slotId = (dayCode, hour) => `${dayCode}-${String(hour).padStart(2, '0')}`

// 'จ-09' → 'จ'
export const dayOf = (id) => id.split('-')[0]

// 'จ-09' → 9
export const hourOf = (id) => Number(id.split('-')[1])

// 'จ-09' → 'จันทร์ 09:00–10:00'
export const slotLabel = (id) => {
  const day = DAYS.find((d) => d.code === dayOf(id))
  const h = hourOf(id)
  return `${day?.label ?? dayOf(id)} ${String(h).padStart(2, '0')}:00–${String(h + 1).padStart(2, '0')}:00`
}
