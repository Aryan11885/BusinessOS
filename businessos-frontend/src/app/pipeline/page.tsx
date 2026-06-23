import AppLayout from "@/components/AppLayout";
import { getOpportunities } from "@/services/api";
import Link from "next/link";

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
      <h1 className="text-3xl font-bold mb-6">Sales Pipeline</h1>

      <div className="grid grid-cols-4 gap-4">
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
    <div className="bg-slate-100 rounded-xl p-4">
      <h2 className="font-bold mb-4">{title}</h2>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded shadow">
            <Link
              href={`/opportunities/${item.id}`}
              className="font-semibold text-blue-600 hover:underline"
            >
              {item.title}
            </Link>

            <p>₹{item.value}</p>

            <p>{item.probability}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
