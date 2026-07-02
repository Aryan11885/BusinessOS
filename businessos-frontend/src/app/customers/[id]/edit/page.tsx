"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import { getCustomerById, updateCustomer } from "@/services/api";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    async function loadCustomer() {
      const customer = await getCustomerById(params.id as string);

      setFormData({
        company_name: customer.company_name,
        contact_name: customer.contact_name,
        email: customer.email,
        phone: customer.phone,
        status: customer.status,
      });

      setLoading(false);
    }

    loadCustomer();
  }, [params.id]);

  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateCustomer(params.id as string, {
        organization_id: 1,
        proposal_id: 1,
        ...formData,
      });

      router.push(`/customers/${params.id}`);
    } finally {
      setIsSaving(false);
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="max-w-2xl animate-pulse space-y-5">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="h-4 w-24 bg-slate-200 rounded" />
                <div className="h-11 w-full bg-slate-100 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl">
        <Link
          href={`/customers/${params.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Customer
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
          Edit Customer
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4"
        >
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">
              Company Name
            </label>
            <input
              name="company_name"
              value={formData.company_name}
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
              value={formData.contact_name}
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
                value={formData.email}
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
                value={formData.phone}
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
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
              <option>ACTIVE</option>
              <option>INACTIVE</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Updating..." : "Update Customer"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}