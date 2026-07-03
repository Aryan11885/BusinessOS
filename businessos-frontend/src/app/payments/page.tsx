"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { getPayments } from "@/services/api";

import { Plus, CreditCard, Search } from "lucide-react";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getPayments();
      setPayments(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = payments.filter((payment) => {
    const q = query.toLowerCase();
    return (
      String(payment.id).includes(q) ||
      payment.payment_method?.toLowerCase().includes(q) ||
      payment.transaction_id?.toLowerCase().includes(q)
    );
  });

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Payments
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Manage customer payments.
          </p>
        </div>

        <Link
          href="/payments/new"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          New Payment
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search payments..."
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
              <CreditCard className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              {query ? "No payments match your search" : "No Payments Yet"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {query ? "Try a different search term" : "Record your first payment to get started"}
            </p>
            {!query && (
              <Link
                href="/payments/new"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 mt-4"
              >
                <Plus className="w-4 h-4" />
                New Payment
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="border-b border-slate-100">
                  <th className="text-left p-4 font-medium text-slate-500 whitespace-nowrap">
                    Payment
                  </th>
                  <th className="text-left p-4 font-medium text-slate-500 whitespace-nowrap">
                    Method
                  </th>
                  <th className="text-left p-4 font-medium text-slate-500 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left p-4 font-medium text-slate-500 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="text-left p-4 font-medium text-slate-500 whitespace-nowrap">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((payment: any) => (
                  <tr
                    key={payment.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 whitespace-nowrap">
                      <Link
                        href={`/payments/${payment.id}`}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                      >
                        <CreditCard className="w-4 h-4" />
                        Payment #{payment.id}
                      </Link>
                    </td>

                    <td className="p-4 text-slate-600 whitespace-nowrap">
                      {payment.payment_method}
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === "SUCCESS"
                            ? "bg-emerald-50 text-emerald-700"
                            : payment.status === "FAILED"
                            ? "bg-red-50 text-red-700"
                            : payment.status === "REFUNDED"
                            ? "bg-orange-50 text-orange-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>

                    <td className="p-4 font-semibold text-slate-900 whitespace-nowrap">
                      ₹{formatINR(payment.amount)}
                    </td>

                    <td className="p-4 text-slate-600 whitespace-nowrap">
                      {payment.payment_date}
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