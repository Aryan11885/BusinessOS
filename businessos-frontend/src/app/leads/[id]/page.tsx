import { getLeadById } from "@/services/api";
import Link from "next/link";
import DeleteLeadButton from "@/components/DeleteLeadButton";
import ConvertLeadButton from "@/components/ConvertLeadButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadDetailsPage({ params }: Props) {
  const { id } = await params;

  const lead = await getLeadById(id);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Lead Details</h1>

      <div className="border rounded-xl p-6 space-y-4">
        <div>
          <strong>Name:</strong> {lead.first_name} {lead.last_name}
        </div>

        <div>
          <strong>Company:</strong> {lead.company_name}
        </div>

        <div>
          <strong>Email:</strong> {lead.email}
        </div>

        <div>
          <strong>Phone:</strong> {lead.phone}
        </div>

        <div>
          <strong>Lead Value:</strong> ₹{lead.lead_value}
        </div>

        <div>
          <strong>City:</strong> {lead.city}
        </div>

        <div>
          <strong>State:</strong> {lead.state}
        </div>

        <div>
          <strong>Remarks:</strong> {lead.remarks}
        </div>
      </div>
      <div className="flex gap-3 mb-6">
        <Link
          href={`/leads/${lead.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Edit Lead
        </Link>

        <DeleteLeadButton id={lead.id} />
        <ConvertLeadButton leadId={lead.id} />
      </div>
    </div>
  );
}
