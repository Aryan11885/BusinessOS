import AppLayout from "@/components/AppLayout";
import { getOpportunities } from "@/services/api";
import Link from "next/link";

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

const STAGE_ACCENTS: Record<string, string> = {
  NEW: "bg-slate-400",
  QUALIFIED: "bg-indigo-500",
  NEGOTIATION: "bg-violet-500",
  WON: "bg-emerald-500",
};

export default async function PipelinePage() {
  const opportunities = await getOpportunities();

  const newItems = opportunities.filter((o: any) => o.stage === "NEW");

  const qualifiedItems = opportunities.filter(
    (o: any) => o.stage === "QUALIFIED",
  );

  const negotiationItems = opportunities.filter(
    (o: any) => o.stage === "NEGOTIATION",
  );

  const wonItems = opportunities.filter((o: any) => o.stage === "WON");

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Sales Pipeline
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track opportunities as they move through each stage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <KanbanColumn title="NEW" items={newItems} />
        <KanbanColumn title="QUALIFIED" items={qualifiedItems} />
        <KanbanColumn title="NEGOTIATION" items={negotiationItems} />
        <KanbanColumn title="WON" items={wonItems} />
      </div>
    </AppLayout>
  );
}

function KanbanColumn({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 lg:min-h-[500px] w-full">
      <h2 className="font-semibold text-sm text-slate-700 mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${STAGE_ACCENTS[title] ?? "bg-slate-400"}`}
          />
          {title}
        </span>

        <span className="bg-white border border-slate-200 rounded-full px-2 py-0.5 text-xs font-medium text-slate-500">
          {items.length}
        </span>
      </h2>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="flex items-center justify-center text-center py-10 border border-dashed border-slate-200 rounded-lg">
            <p className="text-xs text-slate-400">No opportunities</p>
          </div>
        ) : (
          items.map((item) => (
            <Link
              key={item.id}
              href={`/opportunities/${item.id}`}
              className="block bg-white rounded-xl shadow-sm border border-slate-100 p-4 transition-all hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">
                {item.title}
              </h3>

              <p className="text-sm font-medium text-slate-700 mt-2">
                ₹{formatINR(item.value)}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, item.probability))}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500 shrink-0">
                  {item.probability}%
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}