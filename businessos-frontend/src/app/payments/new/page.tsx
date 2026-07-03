"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { createPayment } from "@/services/api";

import {
  ArrowLeft,
  CreditCard,
  Loader2,
} from "lucide-react";

export default function NewPaymentPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    invoice_id: "1",
    amount: "",
    payment_method: "UPI",
    transaction_id: "",
    payment_date: "",
    status: "SUCCESS",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
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
      <div className="max-w-2xl">

        <Link
          href="/payments"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payments
        </Link>

        <h1 className="text-3xl font-bold">
          New Payment
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Record a customer payment.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 space-y-5"
        >

          <input
            name="invoice_id"
            value={formData.invoice_id}
            onChange={handleChange}
            placeholder="Invoice ID"
            className="border rounded-lg w-full p-3"
          />

          <input
            name="amount"
            type="number"
            onChange={handleChange}
            placeholder="Amount"
            required
            className="border rounded-lg w-full p-3"
          />

          <select
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            className="border rounded-lg w-full p-3"
          >
            <option>UPI</option>
            <option>BANK_TRANSFER</option>
            <option>CARD</option>
            <option>CASH</option>
            <option>CHEQUE</option>
          </select>

          <input
            name="transaction_id"
            onChange={handleChange}
            placeholder="Transaction ID"
            className="border rounded-lg w-full p-3"
          />

          <input
            type="date"
            name="payment_date"
            onChange={handleChange}
            className="border rounded-lg w-full p-3"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg w-full p-3"
          >
            <option>SUCCESS</option>
            <option>PENDING</option>
            <option>FAILED</option>
            <option>REFUNDED</option>
          </select>

          <textarea
            rows={5}
            name="notes"
            onChange={handleChange}
            placeholder="Notes..."
            className="border rounded-lg w-full p-3"
          />

          <button
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CreditCard className="w-4 h-4" />
            )}

            {isSubmitting
              ? "Creating..."
              : "Create Payment"}
          </button>

        </form>

      </div>
    </AppLayout>
  );
}