"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  FileText,
  FolderKanban,
  Building2,
  Receipt,
  CreditCard,
  Settings,
  Mail,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/leads", icon: Users },
  { label: "Sales Pipeline", href: "/pipeline", icon: GitBranch },
  { label: "Proposals", href: "/proposals", icon: FileText },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Customers", href: "/customers", icon: Building2 },
  { label: "Invoices", href: "/invoices", icon: Receipt },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Business Mail", href: "/business-mail", icon: Mail },
  { label: "Settings", href: "#", icon: Settings },
];

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  // Lock body scroll and allow Escape to close while drawer is open (mobile only)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const navContent = (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold tracking-tight">BusinessOS</h1>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = href !== "#" && pathname?.startsWith(href);

          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Static sidebar on desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-slate-900 text-white min-h-[100dvh] p-5 sticky top-0">
        {navContent}
      </aside>

      {/* Backdrop + drawer on mobile */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-slate-900/50 transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-slate-900 text-white p-5 flex flex-col transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Sidebar navigation"
      >
        {navContent}
      </aside>
    </>
  );
}
