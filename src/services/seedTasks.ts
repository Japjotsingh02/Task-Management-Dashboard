import type { Task } from "../types";

function todayISODate(): string {
  return new Date().toISOString().split("T")[0];
}

export const MOCK_TASKS: Task[] = [
  {
    id: "seed_1",
    title: "Design system audit",
    description:
      "Review all components for consistency in spacing, color, and typography.",
    priority: "high",
    dueDate: todayISODate(),
    status: "pending",
    createdAt: new Date().toISOString(),
    order: 0,
  },
  {
    id: "seed_2",
    title: "Write unit tests for auth module",
    description: "Cover login, logout, and token refresh flows with Jest.",
    priority: "medium",
    dueDate: todayISODate(),
    status: "pending",
    createdAt: new Date().toISOString(),
    order: 1,
  },
  {
    id: "seed_3",
    title: "Update README documentation",
    description: "Add setup instructions, env variables, and deployment guide.",
    priority: "low",
    dueDate: todayISODate(),
    status: "completed",
    createdAt: new Date().toISOString(),
    order: 2,
  },
];
