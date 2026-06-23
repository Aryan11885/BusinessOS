export default function Navbar() {
  return (
    <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <div>
        <h1 className="font-semibold text-lg">
          BusinessOS AI
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="border rounded-lg px-3 py-2"
        />

        <div className="w-10 h-10 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}