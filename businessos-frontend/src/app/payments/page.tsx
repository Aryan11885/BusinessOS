import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { getPayments } from "@/services/api";

import {
  Plus,
  CreditCard,
} from "lucide-react";

export default async function PaymentsPage() {
  const payments = await getPayments();

  return (
    <AppLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Payments
          </h1>

          <p className="text-slate-500 mt-1">
            Manage customer payments.
          </p>
        </div>

        <Link
          href="/payments/new"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Payment
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="text-left p-4">
                Payment
              </th>

              <th className="text-left p-4">
                Method
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Amount
              </th>

              <th className="text-left p-4">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment: any) => (

              <tr
                key={payment.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="p-4">

                  <Link
                    href={`/payments/${payment.id}`}
                    className="flex items-center gap-2 text-indigo-600 hover:underline"
                  >
                    <CreditCard className="w-4 h-4" />

                    Payment #{payment.id}

                  </Link>

                </td>

                <td className="p-4">
                  {payment.payment_method}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      payment.status === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : payment.status === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : payment.status === "REFUNDED"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                    `}
                  >
                    {payment.status}
                  </span>

                </td>

                <td className="p-4 font-semibold">
                  ₹{payment.amount}
                </td>

                <td className="p-4">
                  {payment.payment_date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AppLayout>
  );
}