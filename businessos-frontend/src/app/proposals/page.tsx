import AppLayout from "@/components/AppLayout";
import { getProposals } from "@/services/api";
import Link from "next/link";

export default async function ProposalsPage() {
  const proposals =
    await getProposals();

  return (
    <AppLayout>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Proposals
        </h1>

        <Link
          href="/proposals/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Proposal
        </Link>
      </div>

      <table className="w-full bg-white rounded-xl shadow">
        <thead>
          <tr>
            <th className="p-3 text-left">
              Proposal No
            </th>

            <th className="p-3 text-left">
              Title
            </th>

            <th className="p-3 text-left">
              Amount
            </th>

            <th className="p-3 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {proposals.map(
            (proposal: any) => (
              <tr
                key={proposal.id}
                className="border-t"
              >
                <td className="p-3">
                  <Link
                    href={`/proposals/${proposal.id}`}
                    className="text-blue-600"
                  >
                    {proposal.proposal_number}
                  </Link>
                </td>

                <td className="p-3">
                  {proposal.title}
                </td>

                <td className="p-3">
                  ₹{proposal.amount}
                </td>

                <td className="p-3">
                  {proposal.status}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </AppLayout>
  );
}