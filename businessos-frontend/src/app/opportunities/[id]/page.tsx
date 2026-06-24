import AppLayout from "@/components/AppLayout";
import { getOpportunityById } from "@/services/api";
import Link from "next/link";
import GenerateProposalButton from "@/components/GenerateProposalButton";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OpportunityDetailsPage({ params }: Props) {
  const { id } = await params;

  const opportunity = await getOpportunityById(id);

  return (
    <AppLayout>
      
      <h1 className="text-3xl font-bold mb-6">Opportunity Details</h1>

      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <div>
          <strong>Title:</strong> {opportunity.title}
        </div>

        <div>
          <strong>Value:</strong> ₹{opportunity.value}
        </div>

        <div>
          <strong>Stage:</strong> {opportunity.stage}
        </div>

        <div>
          <strong>Probability:</strong> {opportunity.probability}%
        </div>

        <div>
          <strong>Lead ID:</strong> {opportunity.lead_id}
        </div>

        <div>
          <strong>Owner:</strong> {opportunity.owner_user_id}
        </div>

        <div>
          <strong>Expected Close:</strong>{" "}
          {String(opportunity.expected_close_date)}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
        href={`/opportunities/${opportunity.id}/edit`}
        className="bg-blue-600 text-white px-4 py-2 rounded inline-block mb-6"
      >
        Edit Opportunity
      </Link>

      <div className="mb-6">
        <GenerateProposalButton opportunity={opportunity} />
      </div>
      </div>

    </AppLayout>
  );
}
