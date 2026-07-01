"use client";

import { Menu, Search } from "lucide-react";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="lg:hidden -ml-1 p-2 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="font-semibold text-base sm:text-lg text-slate-900 truncate">
          BusinessOS AI
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* Full search input on sm+ screens */}
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            placeholder="Search..."
            className="w-40 md:w-64 rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Icon-only search trigger on mobile */}
        <button
          type="button"
          aria-label="Search"
          className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          type="button"
          aria-label="Account"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 shrink-0 transition-all hover:ring-2 hover:ring-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        />
      </div>
    </header>
  );
}