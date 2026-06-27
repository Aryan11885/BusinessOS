"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCustomer } from "@/services/api";

export default function NewCustomerPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
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

    await createCustomer({
      organization_id: 1,
      proposal_id: 1,

      company_name: formData.company_name,
      contact_name: formData.contact_name,
      email: formData.email,
      phone: formData.phone,

      status: "ACTIVE",
    });

    router.push("/customers");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        New Customer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="company_name"
          placeholder="Company"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="contact_name"
          placeholder="Contact Name"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Create Customer
        </button>
      </form>
    </div>
  );
}