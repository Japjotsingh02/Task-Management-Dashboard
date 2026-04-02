export type Priority = "low" | "medium" | "high";
export type Status = "pending" | "completed";
export type ViewMode = "list" | "card";
export type Theme = "light" | "dark";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
  createdAt: string;
  order: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export interface TaskCounts {
  total: number;
  pending: number;
  completed: number;
}
