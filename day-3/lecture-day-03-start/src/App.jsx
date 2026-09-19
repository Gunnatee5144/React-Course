import { useState } from 'react'
import { useFetch } from './hooks/useFetch'

function App() {
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')

  const url = username ? `https://api.github.com/users/${username}` : null
  const { data: user, loading, error } = useFetch(url)

  const handleSubmit = (e) => {
    e.preventDefault()
    setUsername(input.trim())
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        วันที่ 3 — ค้นหา GitHub User
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="เช่น octocat"
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          ค้นหา
        </button>
      </form>

      {loading && <p>กำลังโหลด...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {user && !loading && !error && (
        <div className="border p-4 rounded flex gap-4 items-start">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="font-bold">{user.name ?? user.login}</p>
            <p className="text-sm text-gray-600">@{user.login}</p>
            {user.bio && <p className="mt-1">{user.bio}</p>}
            <p className="mt-1 text-sm">
              followers: {user.followers ?? 0} · repos: {user.public_repos}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
