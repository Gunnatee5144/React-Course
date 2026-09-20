// R3: หน้ารายละเอียด — อ่าน nameOrId ด้วย useParams เท่านั้น
// - แปลงหน่วย: height(dm)->m, weight(hg)->kg
// - id > MAX_ID (มีจริงใน API แต่นอก 151 ตัว) -> ไม่อยู่ใน Pokédex นี้ (Twist 3)
// - ก่อนหน้า/ถัดไปใช้ id, ขอบเขต #1 และ #151
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { useTeam } from '../context/TeamContext'
import { API, MAX_ID, artworkUrl } from '../lib/pokemon'

function PokemonDetail() {
  const { nameOrId } = useParams()
  const { data, loading, error } = useFetch(`${API}/pokemon/${nameOrId}`)
  const { has, addMember, removeMember, isFull } = useTeam()

  if (loading) return <p className="text-gray-500">กำลังโหลด...</p>
  if (error) return <p className="text-red-600">ไม่พบ Pokémon นี้</p>
  if (!data) return null

  const id = data.id

  if (id > MAX_ID) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Pokémon ตัวนี้ไม่อยู่ใน Pokédex นี้ (รองรับแค่ #1–#{MAX_ID})</p>
        <Link to="/pokemon" className="mt-4 inline-block text-red-600">
          กลับหน้ารายการ
        </Link>
      </div>
    )
  }

  const inTeam = has(id)
  const heightM = (data.height / 10).toFixed(1)
  const weightKg = (data.weight / 10).toFixed(1)

  function handleTeamButton() {
    if (inTeam) removeMember(id)
    else addMember({ id, name: data.name })
  }

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row">
        <img src={artworkUrl(id)} alt={data.name} className="mx-auto h-48 w-48 object-contain" />
        <div className="flex-1">
          <p className="text-sm text-gray-400">#{String(id).padStart(3, '0')}</p>
          <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
          <div className="mt-3 flex gap-2">
            {data.types.map((t) => (
              <span key={t.type.name} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                {t.type.name}
              </span>
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-500">ส่วนสูง</dt>
              <dd className="font-semibold">{heightM} ม.</dd>
            </div>
            <div>
              <dt className="text-gray-500">น้ำหนัก</dt>
              <dd className="font-semibold">{weightKg} กก.</dd>
            </div>
          </dl>
          <button
            onClick={handleTeamButton}
            disabled={!inTeam && isFull}
            className="mt-6 rounded-md bg-red-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {inTeam ? 'เอาออกจากทีม' : 'เพิ่มเข้าทีม'}
          </button>
          {!inTeam && isFull && <p className="mt-2 text-xs text-gray-500">ทีมเต็มแล้ว (6/6) — เอาตัวอื่นออกก่อน</p>}
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-4 text-sm">
        {id > 1 ? (
          <Link to={`/pokemon/${id - 1}`} className="text-red-600">
            ← #{id - 1}
          </Link>
        ) : (
          <span />
        )}
        <Link to="/pokemon" className="text-gray-500">
          กลับหน้ารายการ
        </Link>
        {id < MAX_ID ? (
          <Link to={`/pokemon/${id + 1}`} className="text-red-600">
            #{id + 1} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  )
}

export default PokemonDetail
