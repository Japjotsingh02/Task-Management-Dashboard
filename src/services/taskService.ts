import type { FilterState } from "../types";
import type { Task, TaskCounts, TaskFormData } from "../types";

function uid(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function createTask(data: TaskFormData, nextOrder: number): Task {
  return {
    ...data,
    id: uid(),
    status: "pending",
    createdAt: new Date().toISOString(),
    order: nextOrder,
  };
}

export function updateTaskInList(
  tasks: Task[],
  id: string,
  data: Partial<TaskFormData>,
): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, ...data } : t));
}

export function deleteTaskFromList(tasks: Task[], id: string): Task[] {
  return tasks.filter((t) => t.id !== id).map((t, i) => ({ ...t, order: i }));
}

export function toggleTaskStatus(tasks: Task[], id: string): Task[] {
  return tasks.map((t) =>
    t.id === id
      ? { ...t, status: t.status === "pending" ? "completed" : "pending" }
      : t,
  );
}

export function reorderTaskList(
  tasks: Task[],
  from: number,
  to: number,
): Task[] {
  const next = [...tasks];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next.map((t, i) => ({ ...t, order: i }));
}

export function filterTasksByState(tasks: Task[], filter: FilterState): Task[] {
  const q = filter.search.toLowerCase().trim();

  return tasks
    .filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      const matchStatus = filter.status === "all" || t.status === filter.status;
      const matchPriority =
        filter.priority === "all" || t.priority === filter.priority;
      return matchSearch && matchStatus && matchPriority;
    })
    .sort((a, b) => a.order - b.order);
}

export function computeTaskCounts(tasks: Task[]): TaskCounts {
  return {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "pending").length,
    completed: tasks.filter((task) => task.status === "completed").length,
  };
}
