import AppLayout from "@/components/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 shadow">
          <h2>Total Leads</h2>
          <p className="text-3xl font-bold">
            2
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2>Open Leads</h2>
          <p className="text-3xl font-bold">
            2
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2>Won Deals</h2>
          <p className="text-3xl font-bold">
            0
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2>Revenue</h2>
          <p className="text-3xl font-bold">
            ₹500000
          </p>
        </div>
      </div>
    </AppLayout>
  );
}