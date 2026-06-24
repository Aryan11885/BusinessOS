"use client";

import { useRouter } from "next/navigation";
import { deleteProposal } from "@/services/api";

export default function DeleteProposalButton({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed =
      window.confirm(
        "Delete proposal?"
      );

    if (!confirmed) return;

    await deleteProposal(
      String(id)
    );

    router.push("/proposals");
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete Proposal
    </button>
  );
}