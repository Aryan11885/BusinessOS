import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { getInvoiceById } from "@/services/api";

import { ArrowLeft, FileText, Pencil } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default async function InvoiceDetailsPage({ params }: Props) {
  const { id } = await params;

  const invoice = await getInvoiceById(id);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <FileText className="w-7 h-7 text-indigo-600" />

                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {invoice.invoice_number}
                </h1>
              </div>

              <p className="text-slate-500 mt-2">Invoice Details</p>
            </div>

            <Link
              href={`/invoices/${invoice.id}/edit`}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <Pencil className="w-4 h-4" />
              Edit Invoice
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-10">
            <InfoCard title="Customer ID" value={invoice.customer_id} />
            <InfoCard title="Project ID" value={invoice.project_id} />
            <InfoCard title="Amount" value={`₹${formatINR(invoice.amount)}`} />
            <InfoCard title="Tax" value={`₹${formatINR(invoice.tax)}`} />
            <InfoCard title="Total Amount" value={`₹${formatINR(invoice.total_amount)}`} />
            <InfoCard title="Status" value={invoice.status} />
            <InfoCard title="Due Date" value={invoice.due_date || "-"} />
            <InfoCard
              title="Created"
              value={new Date(invoice.created_at).toLocaleDateString()}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Notes - </h3>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 min-h-[120px] text-sm text-slate-600">
              {invoice.notes || "No notes added."}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function InfoCard({ title, value }: { title: string; value: any }) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 transition-colors hover:border-slate-300">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-lg font-semibold text-slate-900 mt-2 break-words">{value}</p>
    </div>
  );
}