import { useState } from 'react'

const TIP_PRESETS = [10, 15, 20]

function TipCalculator() {
  const [bill, setBill] = useState("")
  const [tipPercent, setTipPercent] = useState("10")
  const [people, setPeople] = useState(1)

  const billValue = Number(bill) || 0
  const tipPercentValue = Number(tipPercent) || 0
  const peopleValue = Number(people) || 0

  const tip = billValue * tipPercentValue / 100
  const total = billValue + tip
  const perPerson = peopleValue > 0 ? total / peopleValue : 0

  const handleReset = () => {
    setBill("")
    setTipPercent("10")
    setPeople(1)
  }

  return (
    <section className="max-w-md mx-auto my-12 p-6 border border-slate-200 rounded-xl bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-5 text-slate-900">คำนวณทิป</h2>

      <label className="block mb-4">
        <span className="block text-sm text-slate-600 mb-1">ยอดบิล (บาท)</span>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          placeholder="0"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
        />
      </label>

      <label className="block mb-4">
        <span className="block text-sm text-slate-600 mb-1">ทิป (%)</span>
        <input
          type="number"
          value={tipPercent}
          onChange={(e) => setTipPercent(e.target.value)}
          placeholder="0"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
        />
        <div className="flex gap-2">
          {TIP_PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setTipPercent(String(p))}
              className={
                "px-4 py-1.5 rounded-lg border text-sm font-semibold transition-colors " +
                (tipPercentValue === p
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50")
              }
            >
              {p}%
            </button>
          ))}
        </div>
      </label>

      <label className="block">
        <span className="block text-sm text-slate-600 mb-1">จำนวนคน</span>
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          placeholder="1"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-900"
        />
      </label>

      <div className="border-t border-slate-200 mt-5 pt-4 space-y-1">
        <div className="flex justify-between text-sm text-slate-700">
          <span>ทิป</span>
          <span>{tip.toFixed(2)} บาท</span>
        </div>
        <div className="flex justify-between text-sm text-slate-700">
          <span>ยอดรวม</span>
          <span>{total.toFixed(2)} บาท</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-slate-900">
          <span>คนละ</span>
          <span>{perPerson.toFixed(2)} บาท</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleReset}
        className="w-full mt-5 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
      >
        รีเซ็ต
      </button>
    </section>
  )
}

export default TipCalculator
