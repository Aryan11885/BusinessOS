import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Trophy,
  IndianRupee,
  Plus,
  FileText,
  TrendingUp,
  Clock,
} from "lucide-react";

const STATS = [
  {
    label: "Total Leads",
    value: 2,
    icon: Users,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    label: "Open Leads",
    value: 2,
    icon: UserCheck,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    label: "Won Deals",
    value: 0,
    icon: Trophy,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Revenue",
    value: 560000,
    isCurrency: true,
    icon: IndianRupee,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
];

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function DashboardPage() {
  return (
    <AppLayout>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of your leads, deals, and revenue
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/leads/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
          >
            <Plus className="w-4 h-4" />
            New Lead
          </Link>
          <Link
            href="/proposals/new"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
          >
            <FileText className="w-4 h-4" />
            New Proposal
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(
          ({ label, value, isCurrency, icon: Icon, iconBg, iconColor }) => (
            <div
              key={label}
              className="group bg-white rounded-xl p-5 shadow-sm border border-slate-100 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {label}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg ${iconBg} flex items-center justify-center`}
                >
                  <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 tabular-nums">
                {isCurrency ? `₹${formatINR(value)}` : value}
              </p>
            </div>
          ),
        )}
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Revenue Overview
            </h2>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="h-56 sm:h-64 rounded-lg bg-slate-50 border border-dashed border-slate-200 flex items-center justify-center">
            <p className="text-sm text-slate-400">Chart coming soon</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900">
              Recent Activity
            </h2>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="flex flex-col items-center justify-center text-center py-10">
            <p className="text-sm text-slate-400">No recent activity yet</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
