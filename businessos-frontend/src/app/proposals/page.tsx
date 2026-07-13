"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { getProposals } from "@/services/api";
import { Plus, Search, FileText, Wallet } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SENT: "bg-amber-50 text-amber-700",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-700",
};

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getProposals();
      setProposals(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = proposals.filter((proposal) => {
    const q = query.toLowerCase();
    return (
      proposal.proposal_number?.toLowerCase().includes(q) ||
      proposal.title?.toLowerCase().includes(q)
    );
  });

  const totalValue = proposals.reduce(
    (sum, proposal) => sum + (Number(proposal.amount) || 0),
    0,
  );

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Proposals
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {proposals.length > 0 && (
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2.5">
              <div className="w-7 h-7 rounded-md bg-indigo-50 flex items-center justify-center shrink-0">
                <Wallet className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
                  Total value
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  ₹{formatINR(totalValue)}
                </p>
              </div>
            </div>
          )}

          <Link
            href="/proposals/new"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            New Proposal
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by proposal name or number..."
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
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700">
              {query ? "No proposals match your search" : "No Proposals Yet"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {query ? "Try a different search term" : "Create your first proposal to get started"}
            </p>
            {!query && (
              <Link
                href="/proposals/new"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 mt-4"
              >
                <Plus className="w-4 h-4" />
                New Proposal
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="border-b border-slate-100">
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Proposal No
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Proposal Name
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="p-3 text-left font-medium text-slate-500 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((proposal: any) => (
                  <tr
                    key={proposal.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-3 whitespace-nowrap">
                      <Link
                        href={`/proposals/${proposal.id}`}
                        className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium"
                      >
                        {proposal.proposal_number}
                      </Link>
                    </td>

                    <td className="p-3 text-slate-600 whitespace-nowrap">
                      {proposal.title}
                    </td>

                    <td className="p-3 text-slate-900 font-medium whitespace-nowrap">
                      ₹{formatINR(proposal.amount)}
                    </td>

                    <td className="p-3 whitespace-nowrap">
                      <span
                        className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${
                          STATUS_STYLES[proposal.status] ?? "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {proposal.status}
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