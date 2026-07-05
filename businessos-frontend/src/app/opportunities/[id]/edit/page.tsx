"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { updateOpportunity } from "@/services/api";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  
export default function EditOpportunityPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    value: 0,
    stage: "NEW",
    probability: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${API_URL}/opportunities/${params.id}`);
      const data = await response.json();

      setFormData({
        title: data.title,
        value: data.value,
        stage: data.stage,
        probability: data.probability,
      });

      setLoading(false);
    }

    fetchData();
  }, [params.id]);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateOpportunity(params.id as string, {
        organization_id: 1,
        lead_id: 3,
        owner_user_id: 1,
        title: formData.title,
        value: Number(formData.value),
        stage: formData.stage,
        probability: Number(formData.probability),
        expected_close_date: null,
      });

      router.push(`/opportunities/${params.id}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-xl animate-pulse space-y-5">
          <div className="h-8 w-56 bg-slate-200 rounded" />
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-11 w-full bg-slate-100 rounded-lg" />
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-xl">
        <Link
          href={`/opportunities/${params.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Opportunity
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Edit Opportunity
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Value (₹)
              </label>
              <input
                name="value"
                type="number"
                min={0}
                value={formData.value}
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Probability (%)
              </label>
              <input
                name="probability"
                type="number"
                min={0}
                max={100}
                value={formData.probability}
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Stage
            </label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 text-sm bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option>NEW</option>
              <option>QUALIFIED</option>
              <option>PROPOSAL_SENT</option>
              <option>NEGOTIATION</option>
              <option>WON</option>
              <option>LOST</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Updating..." : "Update Opportunity"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}