"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { createInvoice, getCustomers, getProjects } from "@/services/api";

import {
  ArrowLeft,
  Receipt,
  Loader2,
} from "lucide-react";

export default function NewInvoicePage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [formData, setFormData] = useState({
    customer_id: "",
    project_id: "",
    invoice_number: "",
    amount: "",
    tax_percent: "",
    due_date: "",
    notes: "",
    status: "DRAFT",
  });

  useEffect(() => {
    Promise.all([getCustomers(), getProjects()])
      .then(([customersData, projectsData]) => {
        setCustomers(customersData);
        setProjects(projectsData);
      })
      .finally(() => setLoadingOptions(false));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  // derived values — calculated live from amount + tax percentage
  const amountNum = Number(formData.amount) || 0;
  const taxPercentNum = Number(formData.tax_percent) || 0;
  const taxAmount = (amountNum * taxPercentNum) / 100;
  const totalAmount = amountNum + taxAmount;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await createInvoice({
        organization_id: 1,
        customer_id: Number(formData.customer_id),
        project_id: Number(formData.project_id),
        invoice_number: formData.invoice_number,
        amount: amountNum,
        tax: taxAmount,
        total_amount: totalAmount,
        status: formData.status,
        due_date: formData.due_date,
        notes: formData.notes,
      });

      router.push("/invoices");
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
          href="/invoices"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invoices
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          New Invoice
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Create a new invoice for a customer.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Invoice Number
            </label>
            <input
              name="invoice_number"
              placeholder="INV-1001"
              required
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Customer
              </label>
              <select
                name="customer_id"
                required
                value={formData.customer_id}
                onChange={handleChange}
                disabled={loadingOptions}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="" disabled>
                  {loadingOptions ? "Loading..." : "Select a customer"}
                </option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.company_name || `Customer #${c.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Project
              </label>
              <select
                name="project_id"
                required
                value={formData.project_id}
                onChange={handleChange}
                disabled={loadingOptions}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="" disabled>
                  {loadingOptions ? "Loading..." : "Select a project"}
                </option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name || `Project #${p.id}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Amount (₹)
              </label>
              <input
                name="amount"
                type="number"
                min={0}
                placeholder="0"
                required
                value={formData.amount}
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Tax (%)
              </label>
              <input
                name="tax_percent"
                type="number"
                min={0}
                max={100}
                step="0.01"
                placeholder="e.g. 18"
                required
                value={formData.tax_percent}
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          {(formData.amount || formData.tax_percent) && (
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-4 text-sm space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Amount</span>
                <span>₹{amountNum.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Tax ({taxPercentNum || 0}%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Due Date
            </label>
            <input
              type="date"
              name="due_date"
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
              name="notes"
              placeholder="Notes..."
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <button
            disabled={isSubmitting || loadingOptions}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Receipt className="w-4 h-4" />
            )}
            {isSubmitting ? "Creating..." : "Create Invoice"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}