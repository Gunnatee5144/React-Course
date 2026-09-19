import { useState } from 'react'

const EMAIL_RE = /^.+@.+$/
const PHONE_RE = /^0\d{9}$/

function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", age: "", phone: "" })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const updateField = (field, value) => {
    setForm({ ...form, [field]: value })
    setErrors({ ...errors, [field]: undefined })
    setSuccess(false)
  }

  const validate = () => {
    const newErrors = {}
    if (form.name.trim() === "") newErrors.name = "กรุณากรอกชื่อ"
    if (!EMAIL_RE.test(form.email)) newErrors.email = "อีเมลไม่ถูกต้อง"
    const ageNum = Number(form.age)
    if (form.age === "" || ageNum < 18 || ageNum > 100) {
      newErrors.age = "อายุต้องอยู่ระหว่าง 18–100"
    }
    if (!PHONE_RE.test(form.phone)) {
      newErrors.phone = "เบอร์โทรต้องเป็นตัวเลข 10 หลัก ขึ้นต้นด้วย 0"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(false)
    if (validate()) {
      console.log("สมัครสำเร็จ:", form)
      setSuccess(true)
    }
  }

  const hasError = Object.values(errors).some(Boolean)

  return (
    <form className="max-w-md mx-auto my-12 p-6 border border-slate-200 rounded-xl bg-white shadow-sm space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2 text-slate-900">สมัครสมาชิก</h2>

      <div>
        <input value={form.name} onChange={e => updateField("name", e.target.value)} placeholder="ชื่อ"
          className={`w-full border rounded-lg px-3 py-2 ${errors.name ? "border-red-600" : "border-slate-300"}`} />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input value={form.email} onChange={e => updateField("email", e.target.value)} placeholder="อีเมล"
          className={`w-full border rounded-lg px-3 py-2 ${errors.email ? "border-red-600" : "border-slate-300"}`} />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <input value={form.age} onChange={e => updateField("age", e.target.value)} placeholder="อายุ"
          className={`w-full border rounded-lg px-3 py-2 ${errors.age ? "border-red-600" : "border-slate-300"}`} />
        {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age}</p>}
      </div>

      <div>
        <input value={form.phone} onChange={e => updateField("phone", e.target.value)} placeholder="เบอร์โทร"
          className={`w-full border rounded-lg px-3 py-2 ${errors.phone ? "border-red-600" : "border-slate-300"}`} />
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
      </div>

      <button type="submit" disabled={hasError}
        className={`w-full py-2 rounded-lg font-bold text-white ${hasError ? "bg-slate-300 text-slate-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
        สมัคร
      </button>

      {success && <p className="text-green-600 text-sm text-center font-semibold">สมัครสำเร็จ!</p>}
    </form>
  )
}

export default RegisterForm
