// src/components/TaskCard.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle2, Circle } from "lucide-react";
import type { Task } from "../types";
import { useTaskStore } from "../store/taskStore";
import TaskMetaChips from "./task/TaskMetaChips";
import TaskActionButtons from "./task/TaskActionButtons";

interface Props {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  const { toggleStatus, setEditingId, setDeletingId } = useTaskStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };
  const isComplete = task.status === "completed";

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        animationDelay: `${Math.min(index * 50, 400)}ms`,
        animationFillMode: "backwards",
      }}
      className={`surface rounded-xl p-4 flex flex-col gap-3 animate-slide-up
        transition-all duration-200 group
        ${isComplete ? "opacity-60" : ""}
        hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-sm`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <TaskMetaChips
          priority={task.priority}
          dueDate={task.dueDate}
          status={task.status}
          prioritySize="sm"
          showDue={false}
          className="flex-shrink-0"
        />

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <TaskActionButtons
            onEdit={() => setEditingId(task.id)}
            onDelete={() => setDeletingId(task.id)}
            dragHandle={{
              attributes,
              listeners,
              tabIndex: -1,
              className:
                "p-1 rounded text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 cursor-grab active:cursor-grabbing",
            }}
          />
        </div>
      </div>

      {/* Title */}
      <div>
        <p
          className={`text-sm font-semibold leading-snug
          ${isComplete ? "text-zinc-400 dark:text-zinc-500 line-through" : "text-zinc-900 dark:text-zinc-100"}`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-zinc-100 dark:border-zinc-800">
        <TaskMetaChips
          priority={task.priority}
          dueDate={task.dueDate}
          status={task.status}
          prioritySize="sm"
          showPriority={false}
          className="flex-shrink-0"
        />

        <button
          onClick={() => toggleStatus(task.id)}
          className={`flex items-center gap-1 text-[10px] font-medium transition-colors
            ${
              isComplete
                ? "text-violet-600 dark:text-violet-400 hover:text-zinc-500"
                : "text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400"
            }`}
        >
          {isComplete ? (
            <>
              <CheckCircle2 size={12} /> Done
            </>
          ) : (
            <>
              <Circle size={12} /> Pending
            </>
          )}
        </button>
      </div>
    </div>
  );
}
