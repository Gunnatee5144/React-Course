// R4, R6: หน้าทีม — การ์ดสมาชิก (ใช้ PokemonCard ซ้ำ R7) + ฟอร์มลงทะเบียนทีม
// - ทีมต้องมีอย่างน้อย 3 ตัวถึงส่งได้ (ไม่งั้นปุ่ม disabled บอกว่าขาดอีกกี่ตัว)
// - mode: 'onTouched' -> ไม่ขึ้น error ก่อนผู้ใช้แตะช่อง (Twist 9)
// - schema สร้างใหม่จากชื่อทีมปัจจุบันทุก render -> ชื่อทีมซ้ำ pokemon เช็กสดเสมอ (Twist 8)
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTeam } from '../context/TeamContext'
import { createRegistrationSchema } from '../schemas/registration'
import PokemonCard from '../components/PokemonCard'

const MIN_TEAM_SIZE = 3

function Team() {
  const { team, count, maxSize, removeMember, clearTeam } = useTeam()
  const [submitted, setSubmitted] = useState(null)

  const schema = createRegistrationSchema(team.map((p) => p.name))

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  const canSubmit = count >= MIN_TEAM_SIZE

  async function onSubmit(values) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSubmitted({ ...values, members: team.map((p) => p.name) })
    reset()
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            ทีมของฉัน ({count}/{maxSize})
          </h1>
          {count > 0 && (
            <button onClick={clearTeam} className="text-sm text-red-600">
              ล้างทีม
            </button>
          )}
        </div>

        {count === 0 ? (
          <p className="mt-4 text-gray-500">ทีมยังว่าง — ไปหน้า Pokédex เพื่อเลือกตัวแรก</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {team.map((p) => (
              <PokemonCard
                key={p.id}
                id={p.id}
                name={p.name}
                inTeam
                actions={
                  <button
                    onClick={() => removeMember(p.id)}
                    className="mt-2 block w-full rounded-md border border-red-600 px-2 py-1 text-center text-sm font-semibold text-red-600"
                  >
                    เอาออก
                  </button>
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <h2 className="text-xl font-bold">ลงทะเบียนทีม</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium">ชื่อเทรนเนอร์</label>
            <input {...register('trainerName')} className="mt-1 w-full rounded-md border px-3 py-2" />
            {errors.trainerName && <p className="mt-1 text-sm text-red-600">{errors.trainerName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">ชื่อทีม</label>
            <input {...register('teamName')} className="mt-1 w-full rounded-md border px-3 py-2" />
            {errors.teamName && <p className="mt-1 text-sm text-red-600">{errors.teamName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">อีเมล</label>
            <input {...register('email')} className="mt-1 w-full rounded-md border px-3 py-2" />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">ยืนยันอีเมล</label>
            <input {...register('confirmEmail')} className="mt-1 w-full rounded-md border px-3 py-2" />
            {errors.confirmEmail && <p className="mt-1 text-sm text-red-600">{errors.confirmEmail.message}</p>}
          </div>

          {!canSubmit && (
            <p className="text-sm text-amber-700">
              ทีมมี {count} ตัว — ต้องมีอย่างน้อย {MIN_TEAM_SIZE} ตัว ขาดอีก {MIN_TEAM_SIZE - count} ตัว
            </p>
          )}

          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {isSubmitting ? 'กำลังส่ง…' : 'ลงทะเบียนทีม'}
          </button>
        </form>

        {submitted && (
          <div className="mt-6 max-w-md rounded-lg border bg-green-50 p-4">
            <p className="font-semibold">ลงทะเบียนสำเร็จ!</p>
            <p className="mt-1 text-sm">เทรนเนอร์: {submitted.trainerName}</p>
            <p className="text-sm">ชื่อทีม: {submitted.teamName}</p>
            <p className="mt-2 text-sm text-gray-600">สมาชิก: {submitted.members.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Team
