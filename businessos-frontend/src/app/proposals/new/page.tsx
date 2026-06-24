"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProposal } from "@/services/api";

export default function NewProposalPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      proposal_number: "",
      title: "",
      description: "",
      amount: 0,
    });

  const handleChange = (
    e: any
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e: any
  ) => {
    e.preventDefault();

    await createProposal({
      organization_id: 1,
      opportunity_id: 1,

      proposal_number:
        formData.proposal_number,

      title: formData.title,

      description:
        formData.description,

      amount:
        Number(
          formData.amount
        ),

      status: "DRAFT",
    });

    router.push(
      "/proposals"
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        New Proposal
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="proposal_number"
          placeholder="Proposal Number"
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <input
          name="title"
          placeholder="Title"
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          onChange={
            handleChange
          }
          className="border p-3 rounded w-full"
        />

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Create Proposal
        </button>
      </form>
    </div>
  );
}