"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProposal } from "@/services/api";
import { FileText, Loader2 } from "lucide-react";

export default function GenerateProposalButton({ opportunity }: { opportunity: any }) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const result = await createProposal({
        organization_id: opportunity.organization_id,
        opportunity_id: opportunity.id,
        proposal_number: `PROP-${Date.now()}`,
        title: opportunity.title,
        description: "Generated from Opportunity",
        amount: opportunity.value,
        status: "DRAFT",
      });

      router.push(`/proposals/${result.id}`);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
      {isGenerating ? "Generating..." : "Generate Proposal"}
    </button>
  );
}