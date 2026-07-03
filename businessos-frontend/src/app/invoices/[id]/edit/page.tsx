import AppLayout from "@/components/AppLayout";
import Link from "next/link";

import { getInvoiceById } from "@/services/api";

import EditInvoiceForm from "@/components/EditInvoiceForm";

import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params;

  const invoice = await getInvoiceById(id);

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Edit Invoice
          </h1>

          <Link
            href={`/invoices/${id}`}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <EditInvoiceForm invoice={invoice} />
      </div>
    </AppLayout>
  );
}