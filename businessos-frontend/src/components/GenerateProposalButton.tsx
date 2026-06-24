"use client";

import { useRouter } from "next/navigation";
import { createProposal } from "@/services/api";

export default function GenerateProposalButton({
  opportunity,
}: {
  opportunity: any;
}) {
  const router = useRouter();

  async function handleGenerate() {
    const result =
      await createProposal({
        organization_id:
          opportunity.organization_id,

        opportunity_id:
          opportunity.id,

        proposal_number:
          `PROP-${Date.now()}`,

        title:
          opportunity.title,

        description:
          "Generated from Opportunity",

        amount:
          opportunity.value,

        status: "DRAFT",
      });

    router.push(
      `/proposals/${result.id}`
    );
  }

  return (
    <button
      onClick={
        handleGenerate
      }
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Generate Proposal
    </button>
  );
}