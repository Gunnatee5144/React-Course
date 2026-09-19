const AVATAR_COLORS = ['#0f172a', '#1d4ed8', '#7c3aed', '#0ea5e9', '#16a34a', '#dc2626', '#ea580c', '#0891b2']

function getInitials(name, login) {
  const source = name || login || '?'
  return source
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}

function pickColor(seed) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

export default function UserCard({ user }) {
  const { login, name, avatar_url: avatarUrl, bio, followers } = user
  const hasFollowers = typeof followers === 'number' && !Number.isNaN(followers)

  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={login}
          className="mb-1 h-16 w-16 rounded-full object-cover"
        />
      ) : (
        <div
          className="mb-1 flex h-16 w-16 items-center justify-center rounded-full text-lg font-extrabold text-white"
          style={{ background: pickColor(login || name || '?') }}
        >
          {getInitials(name, login)}
        </div>
      )}

      <div className="text-sm font-bold text-slate-900">{login}</div>
      {name && <div className="text-xs text-slate-500">{name}</div>}
      <div className="min-h-[32px] text-xs leading-relaxed text-slate-500">{bio || '—'}</div>

      <div
        className={
          hasFollowers
            ? 'mt-0.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-900'
            : 'mt-0.5 rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-semibold italic text-slate-400'
        }
      >
        {hasFollowers ? `${followers.toLocaleString()} ผู้ติดตาม` : 'ยังไม่ทราบจำนวนผู้ติดตาม'}
      </div>
    </div>
  )
}
