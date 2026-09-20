import { DAYS } from '../data/rooms.js'
import DayColumn from './DayColumn.jsx'

function WeekGrid() {
  return (
    <div className="mt-6 grid grid-cols-5 gap-2">
      {DAYS.map((day) => (
        <DayColumn key={day.code} day={day} />
      ))}
    </div>
  )
}
export default WeekGrid
