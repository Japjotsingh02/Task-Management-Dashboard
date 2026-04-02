import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import type { FilterStatus, FilterPriority } from "../types";
import FilterChips from "./filter/FilterChips";

const STATUS_OPTIONS: { label: string; value: FilterStatus }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

const PRIORITY_OPTIONS: { label: string; value: FilterPriority }[] = [
  { label: "All", value: "all" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

export default function FilterBar() {
  const {
    filter,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    resetFilters,
  } = useTaskStore();
  const [searchText, setSearchText] = useState(filter.search);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 250),
    [setSearch],
  );

  useEffect(() => {
    if (searchText !== filter.search) {
      debouncedSetSearch(searchText);
    }
    return () => debouncedSetSearch.cancel();
  }, [searchText, filter.search, debouncedSetSearch]);

  const hasActiveFilters =
    filter.search !== "" ||
    filter.status !== "all" ||
    filter.priority !== "all";

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
        />
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search tasks…"
          className="input pl-9 pr-9 h-9 text-sm"
        />
        {searchText && (
          <button
            onClick={() => {
              debouncedSetSearch.cancel();
              setSearchText("");
              setSearch("");
            }}
            title="Remove Search Text"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <SlidersHorizontal
          size={13}
          className="text-zinc-400 flex-shrink-0 mr-2"
        />

        <FilterChips
          options={STATUS_OPTIONS}
          value={filter.status}
          onChange={setStatusFilter}
        />

        <div className="w-[2px] mx-2 h-4 bg-zinc-200 dark:bg-zinc-700" />

        <FilterChips
          options={PRIORITY_OPTIONS}
          value={filter.priority}
          onChange={setPriorityFilter}
        />

        {hasActiveFilters && (
          <button
            onClick={() => {
              debouncedSetSearch.cancel();
              setSearchText("");
              resetFilters();
            }}
            className="ml-auto flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X size={11} /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
