export default function ProgressBar({
  progress,
}: {
  progress: number;
}) {
  return (
    <div className="w-full">

      <div className="w-full h-3 bg-gray-200 rounded-full">

        <div
          className="h-3 bg-green-500 rounded-full"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="mt-2 text-sm">
        {progress}% Complete
      </p>

    </div>
  );
}