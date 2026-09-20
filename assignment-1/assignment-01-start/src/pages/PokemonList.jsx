// R1, R2: รายการ 151 ตัว (ยิงครั้งเดียว) + ค้นหา ?q= + ธาตุ ?type= ผ่าน useSearchParams
// - search/type ไม่เก็บซ้ำใน useState, กรองจากข้อมูลที่ fetch มาแล้ว (ไม่ยิง API ใหม่ทุกครั้งที่พิมพ์)
// - {replace:true} กัน history ยาวทุกตัวอักษร (Twist 2 — กด back ครั้งเดียวต้องออกจากการค้นหา)
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { API, MAX_ID, TYPES, idFromUrl } from '../lib/pokemon'
import { useTeam } from '../context/TeamContext'
import PokemonCard from '../components/PokemonCard'

function PokemonList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const type = searchParams.get('type') ?? ''
  const { has } = useTeam()

  const { data: listData, loading: listLoading, error: listError } = useFetch(`${API}/pokemon?limit=${MAX_ID}`)

  const typeUrl = type ? `${API}/type/${type}` : null
  const { data: typeData, loading: typeLoading, error: typeError } = useFetch(typeUrl)

  const allPokemon = useMemo(() => {
    if (!listData) return []
    return listData.results.map((p) => ({ id: idFromUrl(p.url), name: p.name }))
  }, [listData])

  const typeIds = useMemo(() => {
    if (!type || !typeData) return null
    const ids = new Set()
    for (const entry of typeData.pokemon) {
      const id = idFromUrl(entry.pokemon.url)
      if (id <= MAX_ID) ids.add(id)
    }
    return ids
  }, [type, typeData])

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return allPokemon.filter((p) => {
      const matchesQuery = !query || p.name.toLowerCase().includes(query)
      const matchesType = !type || (typeIds && typeIds.has(p.id))
      return matchesQuery && matchesType
    })
  }, [allPokemon, q, type, typeIds])

  const loading = listLoading || (Boolean(type) && typeLoading)
  const error = listError || typeError

  function handleQueryChange(e) {
    const next = new URLSearchParams(searchParams)
    if (e.target.value) next.set('q', e.target.value)
    else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  function handleTypeChange(e) {
    const next = new URLSearchParams(searchParams)
    if (e.target.value) next.set('type', e.target.value)
    else next.delete('type')
    setSearchParams(next, { replace: true })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Pokédex</h1>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={q}
          onChange={handleQueryChange}
          placeholder="ค้นหาด้วยชื่อ..."
          className="flex-1 rounded-md border px-3 py-2"
        />
        <select value={type} onChange={handleTypeChange} className="rounded-md border px-3 py-2">
          {TYPES.map((t) => (
            <option key={t || 'all'} value={t}>
              {t || 'ทั้งหมด'}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="mt-6 text-gray-500">กำลังโหลด...</p>}
      {error && <p className="mt-6 text-red-600">โหลดข้อมูลไม่สำเร็จ ลองใหม่อีกครั้ง</p>}
      {!loading && !error && filtered.length === 0 && <p className="mt-6 text-gray-500">ไม่พบผลลัพธ์</p>}

      {!loading && !error && filtered.length > 0 && (
        <>
          <p className="mt-4 text-sm text-gray-500">พบ {filtered.length} ตัว</p>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {filtered.map((p) => (
              <PokemonCard key={p.id} id={p.id} name={p.name} inTeam={has(p.id)} linkTo={`/pokemon/${p.id}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default PokemonList
