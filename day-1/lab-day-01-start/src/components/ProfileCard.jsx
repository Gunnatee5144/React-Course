import Avatar from './Avatar.jsx'
import Badge from './Badge.jsx'

const statusLabels = {
  online: 'ออนไลน์',
  away: 'ไม่อยู่ที่โต๊ะ',
  offline: 'ออฟไลน์',
}
function ProfileCard({ user }) {
  const { name, role, department, status, isLead } = user

  return (
    <article
      className={`flex items-center gap-3.5 rounded-xl bg-white p-[18px] ${
        isLead
          ? 'border-2 border-violet-600'
          : 'border border-slate-200'
      }`}
    >
      <Avatar name={name} size={isLead ? 'lg' : 'md'} color={isLead ? 'purple' : 'blue'} />
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-bold leading-[normal]">{name}</h2>
        <p className="mb-2 mt-0.5 text-[13px] text-slate-500">{role} · {department}</p>
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={status}>{statusLabels[status]}</Badge>
          {isLead && <Badge variant="lead">หัวหน้าทีม</Badge>}
        </div>
      </div>
    </article>
  )
}

export default ProfileCard
