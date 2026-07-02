import AppLayout from "@/components/AppLayout";
import { getOpportunityById } from "@/services/api";
import Link from "next/link";
import GenerateProposalButton from "@/components/GenerateProposalButton";
import { ArrowLeft, Pencil, IndianRupee, Layers, User, CalendarClock } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

const STAGE_STYLES: Record<string, string> = {
  NEW: "bg-slate-100 text-slate-700",
  QUALIFIED: "bg-indigo-50 text-indigo-700",
  PROPOSAL_SENT: "bg-amber-50 text-amber-700",
  NEGOTIATION: "bg-violet-50 text-violet-700",
  WON: "bg-emerald-50 text-emerald-700",
  LOST: "bg-red-50 text-red-700",
};

export default async function OpportunityDetailsPage({ params }: Props) {
  const { id } = await params;
  const opportunity = await getOpportunityById(id);

  const stageStyle = STAGE_STYLES[opportunity.stage] ?? "bg-slate-100 text-slate-700";
  const closeDate = opportunity.expected_close_date
    ? String(opportunity.expected_close_date)
    : "Not set";

  return (
    <AppLayout>
      <div className="max-w-2xl">
        <Link
          href="/pipeline"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pipeline
        </Link>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Opportunity Details
          </h1>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href={`/opportunities/${opportunity.id}/edit`}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>

            <GenerateProposalButton opportunity={opportunity} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">
              {opportunity.title}
            </h2>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageStyle}`}>
              {opportunity.stage}
            </span>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                <IndianRupee className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Value
                </p>
                <p className="text-sm text-slate-900 mt-0.5">
                  ₹{formatINR(opportunity.value)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-4 h-4 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500 mb-1.5">
                  Probability
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[200px]">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, opportunity.probability))}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900">
                    {opportunity.probability}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Owner
                </p>
                <p className="text-sm text-slate-900 mt-0.5">{opportunity.owner_user_id}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                <CalendarClock className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Expected Close
                </p>
                <p className="text-sm text-slate-900 mt-0.5">{closeDate}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                <Layers className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Lead ID
                </p>
                <p className="text-sm text-slate-900 mt-0.5">{opportunity.lead_id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}