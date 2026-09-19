export default function FilterBar({
  query,
  onQueryChange,
  minFollowers,
  onMinFollowersChange,
  matchCount,
  totalCount,
  onClear,
}) {
  return (
    <div className="mb-4">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row">
        <label className="block flex-1">
          <span className="mb-1 block text-xs font-semibold text-slate-600">
            ค้นหา (login หรือ name)
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
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
            value={minFollowers}
            onChange={(e) => onMinFollowersChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          พบ <b className="text-slate-900">{matchCount}</b> รายการ จากทั้งหมด {totalCount} คน
        </p>
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
        >
          ล้างตัวกรอง
        </button>
      </div>
    </div>
  )
}
