"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { createPayment, getInvoices } from "@/services/api";

import { ArrowLeft, CreditCard, Loader2 } from "lucide-react";

export default function NewPaymentPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loadingInvoices, setLoadingInvoices] = useState(true);

  const [formData, setFormData] = useState({
    invoice_id: "",
    amount: "",
    payment_method: "UPI",
    transaction_id: "",
    payment_date: "",
    status: "SUCCESS",
    notes: "",
  });

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .finally(() => setLoadingInvoices(false));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await createPayment({
        organization_id: 1,
        invoice_id: Number(formData.invoice_id),
        amount: Number(formData.amount),
        payment_method: formData.payment_method,
        transaction_id: formData.transaction_id,
        payment_date: formData.payment_date,
        status: formData.status,
        notes: formData.notes,
      });

      router.push("/payments");
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <Link
          href="/payments"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payments
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          New Payment
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Record a customer payment.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Invoice
            </label>
            <select
              name="invoice_id"
              required
              value={formData.invoice_id}
              onChange={handleChange}
              disabled={loadingInvoices}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="" disabled>
                {loadingInvoices ? "Loading..." : "Select an invoice"}
              </option>
              {invoices.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.invoice_number || `Invoice #${inv.id}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Amount (₹)
            </label>
            <input
              name="amount"
              type="number"
              min={0}
              placeholder="0"
              onChange={handleChange}
              required
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Payment Method
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option>UPI</option>
              <option>BANK_TRANSFER</option>
              <option>CARD</option>
              <option>CASH</option>
              <option>CHEQUE</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Transaction ID
            </label>
            <input
              name="transaction_id"
              placeholder="TXN123456"
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Payment Date
            </label>
            <input
              type="date"
              name="payment_date"
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option>SUCCESS</option>
              <option>PENDING</option>
              <option>FAILED</option>
              <option>REFUNDED</option>
            </select>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Notes
            </label>
            <textarea
              rows={5}
              name="notes"
              placeholder="Notes..."
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            disabled={isSubmitting || loadingInvoices}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CreditCard className="w-4 h-4" />
            )}
            {isSubmitting ? "Creating..." : "Create Payment"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}