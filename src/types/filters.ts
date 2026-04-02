import type { Priority, Status } from "./task";

export type FilterStatus = "all" | Status;
export type FilterPriority = "all" | Priority;

export interface FilterState {
  search: string;
  status: FilterStatus;
  priority: FilterPriority;
}
