import { useMemo, useState } from 'react'
import { users as ALL_USERS } from './data/users.js'
import FilterBar from './components/FilterBar.jsx'
import UserCard from './components/UserCard.jsx'
import { useFetch } from './hooks/useFetch.js'

const BACKEND_BASE = 'https://mock-server-xi-one.vercel.app'

function matchesQuery(user, q) {
  if (!q) return true
  return (
    user.login.toLowerCase().includes(q) ||
    (user.name || '').toLowerCase().includes(q)
  )
}

function App() {
  const [query, setQuery] = useState('')
  const [minFollowers, setMinFollowers] = useState('0')

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase()
    const min = Number(minFollowers) || 0
    return ALL_USERS.filter((user) => {
      const followerCount = typeof user.followers === 'number' ? user.followers : 0
      return matchesQuery(user, q) && followerCount >= min
    })
  }, [query, minFollowers])

  function handleClear() {
    setQuery('')
    setMinFollowers('0')
  }
  
  const [apiQueryInput, setApiQueryInput] = useState('')
  const [apiMinInput, setApiMinInput] = useState('0')
  const [apiSubmitted, setApiSubmitted] = useState(null)

  const apiMin = apiSubmitted ? Number(apiSubmitted.minFollowers) || 0 : 0
  const apiUrl = apiSubmitted
    ? `${BACKEND_BASE}/users${apiMin > 0 ? `?followers_gte=${apiMin}` : ''}`
    : null

  const {
    data: apiUsers,
    loading: apiLoading,
    error: apiError,
    refetch: apiRefetch,
  } = useFetch(apiUrl)

  const apiFilteredUsers = useMemo(() => {
    if (!apiUsers) return []
    const q = (apiSubmitted?.query || '').trim().toLowerCase()
    return apiUsers.filter((user) => matchesQuery(user, q))
  }, [apiUsers, apiSubmitted])

  function handleApiSubmit(e) {
    e.preventDefault()
    setApiSubmitted({ query: apiQueryInput.trim(), minFollowers: apiMinInput })
  }

  function handleApiClear() {
    setApiQueryInput('')
    setApiMinInput('0')
    setApiSubmitted(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold text-slate-900">GitHub User Browser</h1>

        <section className="mb-12">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            Lab A · รายชื่อ static
          </h2>

          <FilterBar
            query={query}
            onQueryChange={setQuery}
            minFollowers={minFollowers}
            onMinFollowersChange={setMinFollowers}
            matchCount={filteredUsers.length}
            totalCount={ALL_USERS.length}
            onClear={handleClear}
          />

          {filteredUsers.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <div className="mb-2 text-3xl">🔍</div>
              <div className="mb-1 text-base font-bold text-slate-900">ไม่พบผู้ใช้ที่ตรงกับเงื่อนไข</div>
              <div className="mb-4 text-sm text-slate-500">ลองลดค่า "ผู้ติดตามขั้นต่ำ" หรือแก้คำค้นหา</div>
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
              >
                ล้างตัวกรอง
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
            Lab B · ค้นหาจาก backend จริง
          </h2>

          <form onSubmit={handleApiSubmit} className="mb-3 flex flex-col gap-3 sm:flex-row">
            <label className="block flex-1">
              <span className="mb-1 block text-xs font-semibold text-slate-600">
                ค้นหา (login หรือ name)
              </span>
              <input
                type="text"
                value={apiQueryInput}
                onChange={(e) => setApiQueryInput(e.target.value)}
                placeholder="เช่น torvalds, dan..."
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <label className="block sm:w-56">
              <span className="mb-1 block text-xs font-semibold text-slate-600">
                ผู้ติดตามขั้นต่ำ
              </span>
              <input
                type="number"
                min="0"
                value={apiMinInput}
                onChange={(e) => setApiMinInput(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 sm:self-end"
            >
              ค้นหา
            </button>
          </form>

          {!apiSubmitted && (
            <p className="text-sm text-slate-500">พิมพ์เงื่อนไขแล้วกด "ค้นหา" เพื่อดึงข้อมูลจาก backend</p>
          )}

          {apiSubmitted && apiLoading && <p className="text-sm text-slate-500">กำลังโหลด...</p>}

          {apiSubmitted && !apiLoading && apiError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p className="mb-2">{apiError}</p>
              <button
                type="button"
                onClick={apiRefetch}
                className="rounded-lg border border-red-300 bg-white px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                ลองใหม่
              </button>
            </div>
          )}

          {apiSubmitted && !apiLoading && !apiError && apiUsers && (
            <>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  พบ <b className="text-slate-900">{apiFilteredUsers.length}</b> รายการ จาก backend
                </p>
                <button
                  type="button"
                  onClick={handleApiClear}
                  className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                >
                  ล้างตัวกรอง
                </button>
              </div>

              {apiFilteredUsers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
                  <div className="mb-2 text-3xl">🔍</div>
                  <div className="mb-1 text-base font-bold text-slate-900">ไม่พบผู้ใช้ที่ตรงกับเงื่อนไข</div>
                  <div className="mb-4 text-sm text-slate-500">ลองลดค่า "ผู้ติดตามขั้นต่ำ" หรือแก้คำค้นหา</div>
                  <button
                    type="button"
                    onClick={handleApiClear}
                    className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
                  >
                    ล้างตัวกรอง
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {apiFilteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  )
}

export default App
