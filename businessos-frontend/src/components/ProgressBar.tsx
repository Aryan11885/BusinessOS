export default function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  const clamped = Math.min(100, Math.max(0, progress));

  const barColor =
    clamped >= 100
      ? "bg-emerald-500"
      : clamped >= 50
      ? "bg-indigo-500"
      : "bg-amber-500";

  return (
    <div className="w-full">
      <div
        className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Project progress"
      >
        <div
          className={`h-full ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>

      <p className="mt-2 text-sm font-medium text-slate-600">
        {clamped}% Complete
      </p>
    </div>
  );
}