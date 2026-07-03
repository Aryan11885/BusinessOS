"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { updateInvoice, deleteInvoice } from "@/services/api";

import { Trash2, Save, Loader2 } from "lucide-react";

type Props = {
  invoice: any;
};

export default function EditInvoiceForm({ invoice }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    organization_id: invoice.organization_id,
    customer_id: invoice.customer_id,
    project_id: invoice.project_id,
    invoice_number: invoice.invoice_number,
    amount: invoice.amount,
    tax: invoice.tax,
    total_amount: invoice.total_amount,
    status: invoice.status,
    due_date: invoice.due_date || "",
    notes: invoice.notes || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSaving(true);

    try {
      await updateInvoice(String(invoice.id), {
        ...form,
        amount: Number(form.amount),
        tax: Number(form.tax),
        total_amount: Number(form.amount) + Number(form.tax),
      });

      router.push(`/invoices/${invoice.id}`);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this invoice?",
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await deleteInvoice(String(invoice.id));

      router.push("/invoices");
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
          Invoice Number
        </label>

        <input
          value={form.invoice_number}
          onChange={(e) =>
            setForm({
              ...form,
              invoice_number: e.target.value,
            })
          }
          className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            Tax (₹)
          </label>

          <input
            type="number"
            min={0}
            value={form.tax}
            onChange={(e) =>
              setForm({
                ...form,
                tax: Number(e.target.value),
              })
            }
            className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1.5 text-sm font-medium text-slate-700">
          Due Date
        </label>

        <input
          type="date"
          value={form.due_date}
          onChange={(e) =>
            setForm({
              ...form,
              due_date: e.target.value,
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
          <option value="DRAFT">DRAFT</option>
          <option value="SENT">SENT</option>
          <option value="PAID">PAID</option>
          <option value="OVERDUE">OVERDUE</option>
          <option value="CANCELLED">CANCELLED</option>
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
          {isDeleting ? "Deleting..." : "Delete Invoice"}
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
          {isSaving ? "Updating..." : "Update Invoice"}
        </button>
      </div>
    </form>
  );
}