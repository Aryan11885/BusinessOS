"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { convertLead } from "@/services/api";
import { ArrowRightCircle, Loader2 } from "lucide-react";

export default function ConvertLeadButton({ leadId }: { leadId: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      await convertLead(String(leadId));
      router.push("/pipeline");
    } catch (error) {
      console.error(error);
      alert("Failed to convert lead");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleConvert}
      disabled={isLoading}
      className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
    >
      {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRightCircle className="w-4 h-4" />}
      {isLoading ? "Converting..." : "Convert To Opportunity"}
    </button>
  );
}