"use client";

import { useRouter } from "next/navigation";
import { convertLead } from "@/services/api";

export default function ConvertLeadButton({
  leadId,
}: {
  leadId: number;
}) {
  const router = useRouter();

  const handleConvert = async () => {
    try {
      await convertLead(
        String(leadId)
      );

      router.push("/pipeline");
    } catch (error) {
      console.error(error);

      alert(
        "Failed to convert lead"
      );
    }
  };

  return (
    <button
      onClick={handleConvert}
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Convert To Opportunity
    </button>
  );
}