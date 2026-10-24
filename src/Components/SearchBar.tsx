function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}


export function Searchbar() {
  return (
    <div
      role="search"
      className="mx-auto mt-5 max-w-6xl px-6"
    >
      <div className="rounded-2xl border border-white/40 bg-white/30 p-3 shadow-[0_4px_20px_rgba(0,24,69,0.50)] backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#001845]/60" />

            <input
              type="text"
              placeholder="Search products..."
              aria-label="Search products"
              className="w-full rounded-full border-2 border-blue-300 bg-white/60 py-1.5 pl-12 pr-4 text-sm font-semibold text-[#001845] outline-none transition duration-200 placeholder:text-[#001845]/50 focus:border-blue-600 focus:bg-white/80 focus:ring-2 focus:ring-blue-600/30"
            />
          </div>

          <button
            type="button"
            className="shrink-0 cursor-pointer rounded-full bg-[#001845] px-5 py-2 text-sm font-bold text-white transition duration-200 hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 active:scale-95"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}