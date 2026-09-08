function Layout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50 px-5 pb-[52px] pt-11 leading-[normal] text-slate-900 sm:px-10">
      <div className="mx-auto max-w-[1120px]">
        <header className="text-center">
          <p className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.08em] text-slate-500">
            Mockup · Lab Day 1
          </p>
          <h1 className="mb-1.5 text-[30px] font-extrabold">ทีมของเรา</h1>
        </header>
        {children}
      </div>
    </main>
  )
}

export default Layout
