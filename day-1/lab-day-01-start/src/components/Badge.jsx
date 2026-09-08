const variants = {
  online: 'bg-green-100 text-green-700',
  away: 'bg-yellow-100 text-yellow-700',
  offline: 'bg-slate-100 text-slate-600',
  lead: 'bg-violet-100 text-violet-700',
}

function Badge({ variant, children }) {
  return (
    <span className={`${variants[variant]} rounded-full px-2.5 py-[3px] text-[11px] font-semibold`}>
      {children}
    </span>
  )   
}

export default Badge
