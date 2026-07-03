import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { getPaymentById } from "@/services/api";

import {
  ArrowLeft,
  CreditCard,
  Pencil,
} from "lucide-react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PaymentDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const payment = await getPaymentById(id);

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">

        <Link
          href="/payments"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payments
        </Link>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <div className="flex items-center gap-3">

                <CreditCard className="w-7 h-7 text-indigo-600" />

                <h1 className="text-3xl font-bold">
                  Payment #{payment.id}
                </h1>

              </div>

              <p className="text-slate-500 mt-2">
                Payment Details
              </p>

            </div>

            <Link
              href={`/payments/${payment.id}/edit`}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              <Pencil className="w-4 h-4" />
              Edit Payment
            </Link>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <InfoCard
              title="Invoice ID"
              value={payment.invoice_id}
            />

            <InfoCard
              title="Amount"
              value={`₹${payment.amount}`}
            />

            <InfoCard
              title="Payment Method"
              value={payment.payment_method}
            />

            <InfoCard
              title="Transaction ID"
              value={payment.transaction_id || "-"}
            />

            <InfoCard
              title="Status"
              value={payment.status}
            />

            <InfoCard
              title="Payment Date"
              value={payment.payment_date || "-"}
            />

            <InfoCard
              title="Created"
              value={new Date(
                payment.created_at
              ).toLocaleDateString()}
            />

          </div>

          <div className="mt-8">

            <h3 className="text-lg font-semibold mb-2">
              Notes
            </h3>

            <div className="border rounded-lg p-4 bg-slate-50 min-h-[120px]">
              {payment.notes || "No notes added."}
            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="border rounded-xl p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="text-lg font-semibold mt-2">
        {value}
      </p>

    </div>
  );
}