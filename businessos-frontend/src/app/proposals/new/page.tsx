"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { createProposal, getOpportunities } from "@/services/api";
import { ArrowLeft, FilePlus, Loader2 } from "lucide-react";

export default function NewProposalPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loadingOpportunities, setLoadingOpportunities] = useState(true);

  const [formData, setFormData] = useState({
    opportunity_id: "",
    proposal_number: "",
    title: "",
    description: "",
    amount: 0,
  });

  useEffect(() => {
    getOpportunities()
      .then(setOpportunities)
      .finally(() => setLoadingOpportunities(false));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createProposal({
        organization_id: 1,
        opportunity_id: Number(formData.opportunity_id),
        proposal_number: formData.proposal_number,
        title: formData.title,
        description: formData.description,
        amount: Number(formData.amount),
        status: "DRAFT",
      });

      router.push("/proposals");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-xl">
        <Link
          href="/proposals"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Proposals
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          New Proposal
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Opportunity
            </label>
            <select
              name="opportunity_id"
              required
              value={formData.opportunity_id}
              onChange={handleChange}
              disabled={loadingOpportunities}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="" disabled>
                {loadingOpportunities ? "Loading..." : "Select an opportunity"}
              </option>
              {opportunities.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title || o.name || `Opportunity #${o.id}`}
                </option>
              ))}
            </select>
            {!loadingOpportunities && opportunities.length === 0 && (
              <p className="mt-1.5 text-xs text-amber-600">
                No opportunities found. Create one first before adding a proposal.
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Proposal Number
            </label>
            <input
              name="proposal_number"
              placeholder="PROP-1001"
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              name="title"
              placeholder="Website Redesign Proposal"
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Scope, deliverables, timeline..."
              rows={4}
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
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
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || loadingOpportunities}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FilePlus className="w-4 h-4" />}
              {isSubmitting ? "Creating..." : "Create Proposal"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}