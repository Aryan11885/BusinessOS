"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { getCustomers } from "@/services/api";
import { Plus, Search, Users } from "lucide-react";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getCustomers();
      setCustomers(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = customers.filter((customer) => {
    const q = query.toLowerCase();
    return (
      customer.company_name?.toLowerCase().includes(q) ||
      customer.contact_name?.toLowerCase().includes(q) ||
      customer.email?.toLowerCase().includes(q)
    );
  });

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Customers
        </h1>

        <Link
          href="/customers/new"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          New Customer
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search customers..."
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
              {query ? "No customers match your search" : "No Customers Yet"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {query ? "Try a different search term" : "Add your first customer to get started"}
            </p>
            {!query && (
              <Link
                href="/customers/new"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 mt-4"
              >
                <Plus className="w-4 h-4" />
                New Customer
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="border-b border-slate-100">
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Company
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Contact
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Email
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Phone
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((customer: any) => (
                  <tr
                    key={customer.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 whitespace-nowrap">
                      <Link
                        href={`/customers/${customer.id}`}
                        className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                      >
                        {customer.company_name}
                      </Link>
                    </td>

                    <td className="p-3 text-slate-600 whitespace-nowrap">
                      {customer.contact_name}
                    </td>

                    <td className="p-3 text-slate-600 whitespace-nowrap">
                      {customer.email}
                    </td>

                    <td className="p-3 text-slate-600 whitespace-nowrap">
                      {customer.phone}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                          customer.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            customer.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400"
                          }`}
                        />
                        {customer.status}
                      </span>
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