import { ClipboardList, SearchX } from "lucide-react";
import { useTaskStore } from "../store/taskStore";

export default function EmptyState() {
  const { filter, resetFilters } = useTaskStore();
  const hasFilters =
    filter.search !== "" ||
    filter.status !== "all" ||
    filter.priority !== "all";

  if (hasFilters) {
    return (
      <div className="surface rounded-xl py-16 flex flex-col items-center justify-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <SearchX size={18} className="text-zinc-400" />
        </div>
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          No tasks match your filters
        </p>
        <button onClick={resetFilters} className="btn-ghost text-xs">
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="surface rounded-xl py-20 flex flex-col items-center justify-center gap-3 animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
        <ClipboardList size={22} className="text-zinc-300 dark:text-zinc-600" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
          No tasks yet
        </p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
          Create your first task to get started
        </p>
      </div>
    </div>
  );
}
