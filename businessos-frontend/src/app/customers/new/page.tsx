"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { createCustomer, getProposals } from "@/services/api";
import { ArrowLeft, UserPlus, Loader2 } from "lucide-react";

export default function NewCustomerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proposals, setProposals] = useState<any[]>([]);
  const [loadingProposals, setLoadingProposals] = useState(true);

  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    proposal_id: "",
  });

  useEffect(() => {
    getProposals()
      .then((data) => setProposals(data))
      .catch(() => setProposals([]))
      .finally(() => setLoadingProposals(false));
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      await createCustomer({
        // TODO: replace with logged-in user's organization_id once frontend auth is added
        organization_id: 1,
        proposal_id: Number(formData.proposal_id),
        company_name: formData.company_name,
        contact_name: formData.contact_name,
        email: formData.email,
        phone: formData.phone,
        status: "ACTIVE",
      });

      router.push("/customers");
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          New Customer
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Proposal
            </label>
            <select
              name="proposal_id"
              required
              value={formData.proposal_id}
              onChange={handleChange}
              disabled={loadingProposals}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="" disabled>
                {loadingProposals ? "Loading proposals..." : "Select a proposal"}
              </option>
              {proposals.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title || p.company_name || `Proposal #${p.id}`}
                </option>
              ))}
            </select>
            {!loadingProposals && proposals.length === 0 && (
              <p className="mt-1.5 text-xs text-amber-600">
                No proposals found. Create a proposal first before adding a customer.
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Company Name
            </label>
            <input
              name="company_name"
              placeholder="Acme Inc."
              required
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Contact Name
            </label>
            <input
              name="contact_name"
              placeholder="Jane Doe"
              required
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="jane@acme.com"
                required
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                name="phone"
                placeholder="+91 98765 43210"
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              disabled={isSubmitting || loadingProposals}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {isSubmitting ? "Creating..." : "Create Customer"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}