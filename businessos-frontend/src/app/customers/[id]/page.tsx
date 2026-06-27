import AppLayout from "@/components/AppLayout";
import Link from "next/link";
import { getCustomerById } from "@/services/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CustomerDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const customer = await getCustomerById(id);

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Customer Details
        </h1>

        <Link
          href={`/customers/${customer.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Customer
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <strong>Company:</strong>{" "}
          {customer.company_name}
        </div>

        <div>
          <strong>Contact:</strong>{" "}
          {customer.contact_name}
        </div>

        <div>
          <strong>Email:</strong>{" "}
          {customer.email}
        </div>

        <div>
          <strong>Phone:</strong>{" "}
          {customer.phone}
        </div>

        <div>
          <strong>Status:</strong>{" "}
          {customer.status}
        </div>

        <div>
          <strong>Proposal ID:</strong>{" "}
          {customer.proposal_id}
        </div>

        <div>
          <strong>Organization:</strong>{" "}
          {customer.organization_id}
        </div>
      </div>
    </AppLayout>
  );
}