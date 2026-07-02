"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { getLeads } from "@/services/api";
import { Plus, Search, Users } from "lucide-react";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getLeads();
      setLeads(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = leads.filter((lead) => {
    const q = query.toLowerCase();
    return (
      lead.first_name?.toLowerCase().includes(q) ||
      lead.company_name?.toLowerCase().includes(q)
    );
  });

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Leads</h1>

        <Link
          href="/leads/new"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          Add Lead
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search leads..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-sm transition-colors focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 w-full bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              {query ? "No leads match your search" : "No Leads Yet"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {query ? "Try a different search term" : "Add your first lead to get started"}
            </p>
            {!query && (
              <Link
                href="/leads/new"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 mt-4"
              >
                <Plus className="w-4 h-4" />
                Add Lead
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="border-b border-slate-100">
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Name
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Company
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Phone
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Value
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((lead: any) => (
                  <tr
                    key={lead.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 whitespace-nowrap">
                      <Link
                        href={`/leads/${lead.id}`}
                        className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                      >
                        {lead.first_name}
                      </Link>
                    </td>

                    <td className="p-3 text-slate-600 whitespace-nowrap">
                      {lead.company_name}
                    </td>

                    <td className="p-3 text-slate-600 whitespace-nowrap">
                      {lead.phone}
                    </td>

                    <td className="p-3 text-slate-900 font-medium whitespace-nowrap">
                      ₹{formatINR(lead.lead_value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppLayout>
  );
}