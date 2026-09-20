import { HOURS } from '../data/rooms.js'
import SlotButton from './SlotButton.jsx'

function DayColumn({ day }) {
  return (
    <div>
      <p className="mb-2 text-center text-sm font-semibold">{day.label}</p>
      <div className="space-y-1">
        {HOURS.map((hour) => (
          <SlotButton key={hour} dayCode={day.code} hour={hour} />
        ))}
      </div>
    </div>
  )
}
export default DayColumn
