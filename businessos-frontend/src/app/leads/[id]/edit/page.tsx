"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { getLeadById, updateLead } from "@/services/api";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function EditLeadPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    lead_value: "",
    remarks: "",
  });

  useEffect(() => {
    async function fetchLead() {
      // use the shared api.ts helper (with correct https base URL) instead of a
      // separate fetch call, so this page can never point at the wrong backend
      const data = await getLeadById(params.id as string);

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        company_name: data.company_name || "",
        email: data.email || "",
        phone: data.phone || "",
        city: data.city || "",
        state: data.state || "",
        lead_value: data.lead_value?.toString() || "",
        remarks: data.remarks || "",
      });

      setLoading(false);
    }

    fetchLead();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateLead(params.id as string, {
        organization_id: 1,
        lead_code: `LD-${params.id}`,
        first_name: formData.first_name,
        last_name: formData.last_name,
        company_name: formData.company_name,
        email: formData.email,
        phone: formData.phone,
        source_id: 1,
        status_id: 1,
        owner_user_id: 1,
        lead_value: Number(formData.lead_value),
        city: formData.city,
        state: formData.state,
        remarks: formData.remarks,
      });

      router.push("/leads");
    } catch (error) {
      console.error(error);
      alert("Failed to update lead");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-xl animate-pulse space-y-5">
          <div className="h-8 w-40 bg-slate-200 rounded" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
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
          href="/leads"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Edit Lead
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              First Name
            </label>
            <input
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Last Name
            </label>
            <input
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Company Name
            </label>
            <input
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                City
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">
                State
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Lead Value (₹)
            </label>
            <input
              name="lead_value"
              type="number"
              min={0}
              value={formData.lead_value}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Remarks
            </label>
            <textarea
              name="remarks"
              rows={3}
              value={formData.remarks}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Updating..." : "Update Lead"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}