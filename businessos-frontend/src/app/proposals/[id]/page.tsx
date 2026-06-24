import AppLayout from "@/components/AppLayout";
import { getProposalById } from "@/services/api";
import Link from "next/link";
import DeleteProposalButton from "@/components/DeleteProposalButton";


type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProposalDetailsPage({ params }: Props) {
  const { id } = await params;

  const proposal = await getProposalById(id);

  return (
    <AppLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Proposal Details</h1>

        <div className="flex gap-3">
          <Link
            href={`/proposals/${proposal.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Proposal
          </Link>

          <DeleteProposalButton id={proposal.id} />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow space-y-4">
        <div>
          <strong>Proposal Number:</strong> {proposal.proposal_number}
        </div>

        <div>
          <strong>Title:</strong> {proposal.title}
        </div>

        <div>
          <strong>Description:</strong> {proposal.description}
        </div>

        <div>
          <strong>Amount:</strong> ₹{proposal.amount}
        </div>

        <div>
          <strong>Status:</strong> {proposal.status}
        </div>

        <div>
          <strong>Opportunity ID:</strong> {proposal.opportunity_id}
        </div>
      </div>
    </AppLayout>
  );
}
