import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        BusinessOS
      </h1>

      <nav className="flex flex-col gap-4">
        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/leads">
          Leads
        </Link>

        <Link href="#">
          Pipeline
        </Link>

        <Link href="#">
          Customers
        </Link>

        <Link href="#">
          Tasks
        </Link>

        <Link href="#">
          Settings
        </Link>
      </nav>
    </aside>
  );
}