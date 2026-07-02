import { getLeadById } from "@/services/api";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import DeleteLeadButton from "@/components/DeleteLeadButton";
import ConvertLeadButton from "@/components/ConvertLeadButton";
import { ArrowLeft, Pencil, User, Building2, Mail, Phone, IndianRupee, MapPin, StickyNote } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default async function LeadDetailsPage({ params }: Props) {
  const { id } = await params;
  const lead = await getLeadById(id);

  const fields = [
    { label: "Company", value: lead.company_name, icon: Building2 },
    { label: "Email", value: lead.email, icon: Mail },
    { label: "Phone", value: lead.phone, icon: Phone },
    { label: "Lead Value", value: `₹${formatINR(lead.lead_value)}`, icon: IndianRupee },
    { label: "City", value: lead.city, icon: MapPin },
    { label: "State", value: lead.state, icon: MapPin },
    { label: "Remarks", value: lead.remarks, icon: StickyNote },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl">
        <Link
          href="/leads"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Lead Details
          </h1>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Link
              href={`/leads/${lead.id}/edit`}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </Link>

            <DeleteLeadButton id={lead.id} />
            <ConvertLeadButton leadId={lead.id} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-lg shrink-0">
              {lead.first_name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 truncate">
                {lead.first_name} {lead.last_name}
              </p>
              <p className="text-sm text-slate-500 truncate">{lead.company_name}</p>
            </div>
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