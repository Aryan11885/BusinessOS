"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateProposal } from "@/services/api";

const API_URL = "http://127.0.0.1:8000";

export default function EditProposalPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    proposal_number: "",
    title: "",
    description: "",
    amount: 0,
    status: "DRAFT",
  });

  useEffect(() => {
    async function fetchProposal() {
      const response = await fetch(
        `${API_URL}/proposals/${params.id}`
      );

      const data = await response.json();

      setFormData({
        proposal_number: data.proposal_number || "",
        title: data.title || "",
        description: data.description || "",
        amount: data.amount || 0,
        status: data.status || "DRAFT",
      });

      setLoading(false);
    }

    fetchProposal();
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateProposal(
        params.id as string,
        {
          organization_id: 1,
          opportunity_id: 1,

          proposal_number:
            formData.proposal_number,

          title: formData.title,

          description:
            formData.description,

          amount: Number(
            formData.amount
          ),

          status: formData.status,
        }
      );

      router.push(
        `/proposals/${params.id}`
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to update proposal"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Proposal
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="proposal_number"
          value={formData.proposal_number}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option value="DRAFT">
            DRAFT
          </option>

          <option value="SENT">
            SENT
          </option>

          <option value="APPROVED">
            APPROVED
          </option>

          <option value="REJECTED">
            REJECTED
          </option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Update Proposal
        </button>
      </form>
    </div>
  );
}