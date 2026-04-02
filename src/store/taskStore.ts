// src/store/taskStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FilterState, TaskStore } from "../types";
import { MOCK_TASKS } from "../services/seedTasks";
import {
  createTask,
  updateTaskInList,
  deleteTaskFromList,
  toggleTaskStatus,
  reorderTaskList,
  filterTasksByState,
  computeTaskCounts,
} from "../services/taskService";

const DEFAULT_FILTER: FilterState = {
  search: "",
  status: "all",
  priority: "all",
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: MOCK_TASKS,
      filter: DEFAULT_FILTER,
      viewMode: "list",
      theme: "light",
      editingId: null,
      deletingId: null,

      addTask: (data) => {
        set((s) => ({ tasks: [...s.tasks, createTask(data, s.tasks.length)] }));
      },
      updateTask: (id, data) => {
        set((s) => ({
          tasks: updateTaskInList(s.tasks, id, data),
        }));
      },
      deleteTask: (id) => {
        set((s) => ({
          tasks: deleteTaskFromList(s.tasks, id),
          deletingId: null,
        }));
      },
      reorderTasks: (from, to) => {
        set((s) => {
          return { tasks: reorderTaskList(s.tasks, from, to) };
        });
      },
      filteredTasks: () => {
        const { tasks, filter } = get();
        return filterTasksByState(tasks, filter);
      },
      taskCounts: () => {
        return computeTaskCounts(get().tasks);
      },

      toggleStatus: (id) => {
        set((s) => ({
          tasks: toggleTaskStatus(s.tasks, id),
        }));
      },

      setSearch: (search) => set((s) => ({ filter: { ...s.filter, search } })),
      setStatusFilter: (status) =>
        set((s) => ({ filter: { ...s.filter, status } })),
      setPriorityFilter: (priority) =>
        set((s) => ({ filter: { ...s.filter, priority } })),
      resetFilters: () => set({ filter: DEFAULT_FILTER }),

      setViewMode: (viewMode) => set({ viewMode }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "light" ? "dark" : "light" })),
      setEditingId: (editingId) => set({ editingId }),
      setDeletingId: (deletingId) => set({ deletingId }),
    }),
    {
      name: "taskflow-store",
      partialize: (s) => ({
        tasks: s.tasks,
        viewMode: s.viewMode,
        theme: s.theme,
      }),
    },
  ),
);
