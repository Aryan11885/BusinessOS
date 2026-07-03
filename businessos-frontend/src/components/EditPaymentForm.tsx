"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updatePayment, deletePayment } from "@/services/api";

import { Trash2, Save, Loader2 } from "lucide-react";

type Props = {
  payment: any;
};

export default function EditPaymentForm({ payment }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    organization_id: payment.organization_id,
    invoice_id: payment.invoice_id,
    amount: payment.amount,
    payment_method: payment.payment_method,
    transaction_id: payment.transaction_id || "",
    payment_date: payment.payment_date || "",
    status: payment.status,
    notes: payment.notes || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSaving(true);

    try {
      await updatePayment(String(payment.id), {
        ...form,
        amount: Number(form.amount),
      });

      router.push(`/payments/${payment.id}`);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this payment?",
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await deletePayment(String(payment.id));

      router.push("/payments");
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  const busy = isSaving || isDeleting;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 sm:p-8 space-y-5"
    >
      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Invoice ID
        </label>

        <input
          type="number"
          value={form.invoice_id}
          onChange={(e) =>
            setForm({
              ...form,
              invoice_id: Number(e.target.value),
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Amount (₹)
        </label>

        <input
          type="number"
          min={0}
          value={form.amount}
          onChange={(e) =>
            setForm({
              ...form,
              amount: Number(e.target.value),
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Payment Method
        </label>

        <select
          value={form.payment_method}
          onChange={(e) =>
            setForm({
              ...form,
              payment_method: e.target.value,
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="UPI">UPI</option>
          <option value="BANK_TRANSFER">BANK_TRANSFER</option>
          <option value="CARD">CARD</option>
          <option value="CASH">CASH</option>
          <option value="CHEQUE">CHEQUE</option>
        </select>
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Transaction ID
        </label>

        <input
          value={form.transaction_id}
          onChange={(e) =>
            setForm({
              ...form,
              transaction_id: e.target.value,
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Payment Date
        </label>

        <input
          type="date"
          value={form.payment_date}
          onChange={(e) =>
            setForm({
              ...form,
              payment_date: e.target.value,
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Status
        </label>

        <select
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value,
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="SUCCESS">SUCCESS</option>
          <option value="PENDING">PENDING</option>
          <option value="FAILED">FAILED</option>
          <option value="REFUNDED">REFUNDED</option>
        </select>
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Notes
        </label>

        <textarea
          rows={5}
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value,
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={handleDelete}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}

          {isDeleting ? "Deleting..." : "Delete Payment"}
        </button>

        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}

          {isSaving ? "Updating..." : "Update Payment"}
        </button>
      </div>
    </form>
  );
}