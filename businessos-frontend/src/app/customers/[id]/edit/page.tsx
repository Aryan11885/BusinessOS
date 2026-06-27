"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCustomerById,
  updateCustomer,
} from "@/services/api";

export default function EditCustomerPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      company_name: "",
      contact_name: "",
      email: "",
      phone: "",
      status: "ACTIVE",
    });

  useEffect(() => {
    async function loadCustomer() {
      const customer =
        await getCustomerById(
          params.id as string
        );

      setFormData({
        company_name:
          customer.company_name,

        contact_name:
          customer.contact_name,

        email:
          customer.email,

        phone:
          customer.phone,

        status:
          customer.status,
      });

      setLoading(false);
    }

    loadCustomer();
  }, [params.id]);

  function handleChange(
    e: any
  ) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  async function handleSubmit(
    e: any
  ) {
    e.preventDefault();

    await updateCustomer(
      params.id as string,
      {
        organization_id: 1,
        proposal_id: 1,

        ...formData,
      }
    );

    router.push(
      `/customers/${params.id}`
    );
  }

  if (loading)
    return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Customer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="contact_name"
          value={formData.contact_name}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option>ACTIVE</option>
          <option>INACTIVE</option>
        </select>

        <button className="bg-blue-600 text-white px-5 py-3 rounded">
          Update Customer
        </button>
      </form>
    </div>
  );
}