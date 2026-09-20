import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.jsx'
import { bookingSchema } from '../schemas/booking.js'
import { DEPARTMENTS, slotLabel } from '../data/rooms.js'

function Confirm() {
  const { slots, clear } = useBooking()
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { bookerName: '', department: '', email: '', confirmEmail: '', purpose: '' },
  })

  if (done) {
    return (
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-green-700">จองสำเร็จ</h1>
        <p className="mt-2 text-sm text-gray-500">ระบบบันทึกการจองของคุณแล้ว</p>
        <Link to="/" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          ← กลับหน้าแรก
        </Link>
      </section>
    )
  }

  if (slots.length === 0) {
    return (
      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold">ยังไม่ได้เลือกช่วงเวลา</h1>
        <p className="mt-2 text-sm text-gray-500">กลับไปเลือกเวลาก่อนกรอกฟอร์มยืนยัน</p>
        <Link to="/" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
          ← ไปเลือกเวลา
        </Link>
      </section>
    )
  }

  const onSubmit = () => {
    clear()
    setDone(true)
  }

  const sorted = [...slots].sort()

  return (
    <section className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="mb-1 text-2xl font-bold">ยืนยันการจอง</h1>
      <p className="mb-6 text-sm text-gray-500">
        รวม {slots.length} ชั่วโมง — {sorted.map(slotLabel).join(', ')}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-lg">
        <label className="mb-4 block">
          <span className="text-sm font-medium">ชื่อผู้จอง</span>
          <input {...register('bookerName')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.bookerName && <p className="mt-1 text-sm text-red-600">{errors.bookerName.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">แผนก</span>
          <select {...register('department')} className="mt-1 w-full rounded border px-3 py-2">
            <option value="">— เลือกแผนก —</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">อีเมล</span>
          <input {...register('email')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">ยืนยันอีเมลอีกครั้ง</span>
          <input {...register('confirmEmail')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.confirmEmail && <p className="mt-1 text-sm text-red-600">{errors.confirmEmail.message}</p>}
        </label>

        <label className="mb-4 block">
          <span className="text-sm font-medium">วัตถุประสงค์การใช้ห้อง</span>
          <textarea rows={3} {...register('purpose')} className="mt-1 w-full rounded border px-3 py-2" />
          {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>}
        </label>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
        >
          ยืนยันการจอง
        </button>
      </form>
    </section>
  )
}
export default Confirm
