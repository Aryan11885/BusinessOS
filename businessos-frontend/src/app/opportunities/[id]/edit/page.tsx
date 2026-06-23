"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateOpportunity } from "@/services/api";

const API_URL = "http://127.0.0.1:8000";

export default function EditOpportunityPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      title: "",
      value: 0,
      stage: "NEW",
      probability: 0,
    });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${API_URL}/opportunities/${params.id}`
      );

      const data =
        await response.json();

      setFormData({
        title: data.title,
        value: data.value,
        stage: data.stage,
        probability:
          data.probability,
      });

      setLoading(false);
    }

    fetchData();
  }, [params.id]);

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

    await updateOpportunity(
      params.id as string,
      {
        organization_id: 1,
        lead_id: 3,
        owner_user_id: 4,

        title:
          formData.title,

        value:
          Number(
            formData.value
          ),

        stage:
          formData.stage,

        probability:
          Number(
            formData.probability
          ),

        expected_close_date:
          null,
      }
    );

    router.push(
      `/opportunities/${params.id}`
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Opportunity
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="value"
          type="number"
          value={formData.value}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <select
          name="stage"
          value={formData.stage}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option>
            NEW
          </option>

          <option>
            QUALIFIED
          </option>

          <option>
            PROPOSAL_SENT
          </option>

          <option>
            NEGOTIATION
          </option>

          <option>
            WON
          </option>

          <option>
            LOST
          </option>
        </select>

        <input
          name="probability"
          type="number"
          value={
            formData.probability
          }
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Update Opportunity
        </button>
      </form>
    </div>
  );
}