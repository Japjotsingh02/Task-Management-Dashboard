import type { FilterState } from "./filters";
import type { Task, TaskCounts, TaskFormData, Theme, ViewMode } from "./task";

export interface TaskStore {
  tasks: Task[];
  filter: FilterState;
  viewMode: ViewMode;
  theme: Theme;
  editingId: string | null;
  deletingId: string | null;

  addTask: (data: TaskFormData) => void;
  updateTask: (id: string, data: Partial<TaskFormData>) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
  reorderTasks: (from: number, to: number) => void;

  setSearch: (q: string) => void;
  setStatusFilter: (s: "all" | Task["status"]) => void;
  setPriorityFilter: (p: "all" | Task["priority"]) => void;
  resetFilters: () => void;

  setViewMode: (m: ViewMode) => void;
  toggleTheme: () => void;
  setEditingId: (id: string | null) => void;
  setDeletingId: (id: string | null) => void;

  filteredTasks: () => Task[];
  taskCounts: () => TaskCounts;
}
