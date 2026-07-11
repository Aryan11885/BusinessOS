import AppLayout from "@/components/AppLayout";
import { getProposalById } from "@/services/api";
import Link from "next/link";
import DeleteProposalButton from "@/components/DeleteProposalButton";
import { ArrowLeft, Pencil, Hash, FileText, IndianRupee, Layers } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SENT: "bg-amber-50 text-amber-700",
  APPROVED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-700",
};

export default async function ProposalDetailsPage({ params }: Props) {
  const { id } = await params;
  const proposal = await getProposalById(id);

  const statusStyle = STATUS_STYLES[proposal.status] ?? "bg-slate-100 text-slate-600";

  const fields = [
    { label: "Proposal Number", value: proposal.proposal_number, icon: Hash },
    { label: "Description", value: proposal.description, icon: FileText },
    { label: "Amount", value: `₹${formatINR(proposal.amount)}`, icon: IndianRupee },
    { label: "Opportunity ID", value: proposal.opportunity_id, icon: Layers },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/proposals"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Proposals
        </Link>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Proposal Details
          </h1>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href={`/proposals/${proposal.id}/edit`}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>

            <DeleteProposalButton id={proposal.id} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">
              {proposal.title}
            </h2>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle}`}>
              {proposal.status}
            </span>
          </div>

          <dl className="space-y-4">
            {fields.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
                <div className="min-w-0">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {label}
                  </dt>
                  <dd className="text-sm text-slate-900 mt-0.5 break-words">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </AppLayout>
  );
}