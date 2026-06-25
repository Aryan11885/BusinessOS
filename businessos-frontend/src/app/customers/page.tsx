import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { getCustomers } from "@/services/api";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <Link
          href="/customers/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Customer
        </Link>
      </div>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">
              Company
            </th>

            <th className="p-3 text-left">
              Contact
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Phone
            </th>

            <th className="p-3 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer: any) => (
            <tr
              key={customer.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3">
                <Link
                  href={`/customers/${customer.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {customer.company_name}
                </Link>
              </td>

              <td className="p-3">
                {customer.contact_name}
              </td>

              <td className="p-3">
                {customer.email}
              </td>

              <td className="p-3">
                {customer.phone}
              </td>

              <td className="p-3">
                {customer.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
}