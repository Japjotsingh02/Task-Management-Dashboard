// src/components/StatsBar.tsx
import { useShallow } from "zustand/react/shallow";
import { useTaskStore } from "../store/taskStore";

function Stat({
  label,
  value,
  accent = "text-zinc-900 dark:text-zinc-100",
}: {
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div>
      <p className={`text-2xl font-semibold leading-none ${accent}`}>{value}</p>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  const counts = useTaskStore(useShallow((s) => s.taskCounts()));
  const pct =
    counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0;

  return (
    <div className="surface rounded-xl px-5 py-4">
      <div className="flex items-center gap-6 mb-3">
        <Stat label="Total" value={counts.total} />
        <div className="w-px h-8 bg-zinc-100 dark:bg-zinc-800" />
        <Stat
          label="Pending"
          value={counts.pending}
          accent="text-amber-600 dark:text-amber-400"
        />
        <div className="w-px h-8 bg-zinc-100 dark:bg-zinc-800" />
        <Stat
          label="Completed"
          value={counts.completed}
          accent="text-violet-600 dark:text-violet-400"
        />

        <div className="ml-auto text-right">
          <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 leading-none">
            {pct}%
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">complete</p>
        </div>
      </div>

      <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
