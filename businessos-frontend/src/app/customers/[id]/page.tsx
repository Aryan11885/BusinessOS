import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { getCustomerById } from "@/services/api";
import { ArrowLeft, Pencil, Building2, User, Mail, Phone, FileText, Layers } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CustomerDetailsPage({ params }: Props) {
  const { id } = await params;
  const customer = await getCustomerById(id);

  const isActive = customer.status === "ACTIVE";

  const fields = [
    { label: "Company", value: customer.company_name, icon: Building2 },
    { label: "Contact", value: customer.contact_name, icon: User },
    { label: "Email", value: customer.email, icon: Mail },
    { label: "Phone", value: customer.phone, icon: Phone },
    { label: "Proposal ID", value: customer.proposal_id, icon: FileText },
    { label: "Organization", value: customer.organization_id, icon: Layers },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/customers"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </Link>

        <div className="flex justify-between items-start gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Customer Details
          </h1>

          <Link
            href={`/customers/${customer.id}/edit`}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 shrink-0"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-lg shrink-0">
              {customer.company_name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-900 truncate">
                {customer.company_name}
              </p>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? "bg-emerald-500" : "bg-slate-400"
                  }`}
                />
                {customer.status}
              </span>
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