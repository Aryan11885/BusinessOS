"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { updateLead } from "@/services/api";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

const API_URL = "http://127.0.0.1:8000";

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
  });

  useEffect(() => {
    async function fetchLead() {
      const response = await fetch(`${API_URL}/leads/${params.id}`);
      const data = await response.json();

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        company_name: data.company_name || "",
        email: data.email || "",
        phone: data.phone || "",
      });

      setLoading(false);
    }

    fetchLead();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        lead_value: 500000,
        city: "Prayagraj",
        state: "Uttar Pradesh",
        remarks: "Updated From Frontend",
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