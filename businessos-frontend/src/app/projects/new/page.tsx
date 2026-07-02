"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import AppLayout from "@/components/AppLayout";
import { createProject } from "@/services/api";

import {
  ArrowLeft,
  FolderPlus,
  Loader2,
} from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    customer_id: "1",
    status: "NOT_STARTED",
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
      await createProject({
        organization_id: 1,
        customer_id: Number(formData.customer_id),

        name: formData.name,
        description: formData.description,

        status: formData.status,
        progress: 0,
      });

      router.push("/projects");
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
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <h1 className="text-3xl font-bold text-slate-900">
          Create New Project
        </h1>

        <p className="text-slate-500 mt-2 mb-8">
          Create and manage a new customer project.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-5"
        >

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Project Name
            </label>

            <input
              required
              name="name"
              placeholder="BusinessOS CRM"
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

          </div>

          <div>

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              placeholder="Describe this project..."
              onChange={handleChange}
              className="border border-slate-200 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-700">
                Customer ID
              </label>

              <input
                required
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />

            </div>

            <div>

              <label className="block mb-2 text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-slate-200 rounded-lg w-full p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="NOT_STARTED">
                  NOT_STARTED
                </option>

                <option value="IN_PROGRESS">
                  IN_PROGRESS
                </option>

                <option value="COMPLETED">
                  COMPLETED
                </option>

              </select>

            </div>

          </div>

          <div className="flex gap-3 pt-3">

            <Link
              href="/projects"
              className="px-5 py-3 rounded-lg border border-slate-200 hover:bg-slate-50"
            >
              Cancel
            </Link>

            <button
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <FolderPlus className="w-4 h-4" />
              )}

              {isSubmitting
                ? "Creating..."
                : "Create Project"}
            </button>

          </div>

        </form>

      </div>
    </AppLayout>
  );
}