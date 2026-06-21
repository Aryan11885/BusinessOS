import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-4 mt-8">
          <div className="border rounded-xl p-5">
            <h2>Total Leads</h2>
            <p className="text-3xl font-bold">
              1
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2>Open Leads</h2>
            <p className="text-3xl font-bold">
              1
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2>Won Deals</h2>
            <p className="text-3xl font-bold">
              0
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h2>Revenue</h2>
            <p className="text-3xl font-bold">
              ₹200000
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}