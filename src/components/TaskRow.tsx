import { useState, type CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import type { Task } from "../types";
import { useTaskStore } from "../store/taskStore";
import TaskMetaChips from "./task/TaskMetaChips";
import TaskActionButtons from "./task/TaskActionButtons";

interface Props {
  task: Task;
  index: number;
}

export default function TaskRow({ task, index }: Props) {
  const { toggleStatus, setEditingId, setDeletingId } = useTaskStore();
  const [hovered, setHovered] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : undefined,
    animationDelay: `${Math.min(index * 35, 350)}ms`,
    animationFillMode: "backwards",
  };

  const isComplete = task.status === "completed";

  return (
    <div
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group flex items-start gap-3 px-4 py-3.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0
        transition-colors duration-100 animate-slide-up
        ${isComplete ? "bg-zinc-50/50 dark:bg-zinc-900/30" : "bg-white dark:bg-zinc-900"}
        hover:bg-zinc-50 dark:hover:bg-zinc-800/40`}
    >
      <button
        {...attributes}
        {...listeners}
        className="mt-0.5 text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-400
                   cursor-grab active:cursor-grabbing transition-colors touch-none flex-shrink-0"
        tabIndex={-1}
        aria-label="Drag to reorder"
      >
        <GripVertical size={14} />
      </button>

      <button
        onClick={() => toggleStatus(task.id)}
        className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center
          ${
            isComplete
              ? "bg-violet-600 border-violet-600"
              : "border-zinc-300 dark:border-zinc-600 hover:border-violet-400"
          }`}
        aria-label={isComplete ? "Mark as pending" : "Mark as complete"}
      >
        {isComplete && (
          <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
            <path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-medium leading-snug truncate transition-all duration-200
              ${isComplete ? "text-zinc-400 dark:text-zinc-500 line-through" : "text-zinc-900 dark:text-zinc-100"}`}
            >
              {task.title}
            </p>
            {task.description && (
              <p
                className={`text-xs mt-0.5 truncate transition-all duration-200
                ${isComplete ? "text-zinc-300 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"}`}
              >
                {task.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <TaskMetaChips
              priority={task.priority}
              dueDate={task.dueDate}
              status={task.status}
              prioritySize="sm"
              className="contents"
            />

            <div
              className={`flex items-center gap-1 transition-opacity duration-150 ${hovered ? "opacity-100" : "opacity-0"}`}
            >
              <TaskActionButtons
                onEdit={() => setEditingId(task.id)}
                onDelete={() => setDeletingId(task.id)}
                editButtonClassName="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
                deleteButtonClassName="p-1 rounded-md text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
