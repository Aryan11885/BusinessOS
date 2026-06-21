"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { updateLead } from "@/services/api";

const API_URL = "http://127.0.0.1:8000";

export default function EditLeadPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    async function fetchLead() {
      const response = await fetch(
        `${API_URL}/leads/${params.id}`
      );

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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
      await updateLead(
        params.id as string,
        {
          organization_id: 1,
          lead_code: `LD-${params.id}`,
          first_name: formData.first_name,
          last_name: formData.last_name,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          source_id: 1,
          status_id: 1,
          owner_user_id: 4,
          lead_value: 500000,
          city: "Prayagraj",
          state: "Uttar Pradesh",
          remarks: "Updated From Frontend",
        }
      );

      router.push("/leads");
    } catch (error) {
      console.error(error);
      alert("Failed to update lead");
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Lead
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >
        <input
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Update Lead
        </button>
      </form>
    </div>
  );
}