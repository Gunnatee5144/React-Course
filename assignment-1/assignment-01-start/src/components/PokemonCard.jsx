// R7: การ์ดรูป + #id + ชื่อ + ป้าย "อยู่ในทีม" — ใช้ซ้ำทั้งหน้า /pokemon และ /team
import { Link } from 'react-router-dom'
import { artworkUrl } from '../lib/pokemon'

function PokemonCard({ id, name, inTeam, linkTo, actions }) {
  const content = (
    <div className="flex flex-col rounded-lg border bg-white p-3 shadow-sm">
      <div className="relative">
        <img src={artworkUrl(id)} alt={name} className="mx-auto h-28 w-28 object-contain" />
        {inTeam && (
          <span className="absolute right-0 top-0 rounded-full bg-green-600 px-2 py-0.5 text-xs font-semibold text-white">
            อยู่ในทีม
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-gray-400">#{String(id).padStart(3, '0')}</p>
      <p className="font-semibold capitalize">{name}</p>
    </div>
  )

  return (
    <div>
      {linkTo ? <Link to={linkTo}>{content}</Link> : content}
      {actions}
    </div>
  )
}

export default PokemonCard
