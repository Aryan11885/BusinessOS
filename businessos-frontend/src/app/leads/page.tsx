import { getLeads } from "@/services/api";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <AppLayout>
      ...
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Leads</h1>

          <Link
            href="/leads/new"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Lead
          </Link>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Value</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead: any) => (
              <tr key={lead.id} className="border-b">
                <td className="p-3">
                  <Link
                    href={`/leads/${lead.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {lead.first_name}
                  </Link>
                </td>
                <td className="p-3">{lead.company_name}</td>

                <td className="p-3">{lead.phone}</td>

                <td className="p-3">₹{lead.lead_value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
