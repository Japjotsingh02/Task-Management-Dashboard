import { Pencil, Trash2, GripVertical } from "lucide-react";
import type {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  dragHandle?: {
    attributes: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
    className?: string;
    tabIndex?: number;
  };
  editButtonClassName?: string;
  deleteButtonClassName?: string;
}

export default function TaskActionButtons({
  onEdit,
  onDelete,
  dragHandle,
  editButtonClassName,
  deleteButtonClassName,
}: Props) {
  return (
    <>
      {dragHandle && (
        <button
          {...dragHandle.attributes}
          {...(dragHandle.listeners as Record<string, unknown>)}
          tabIndex={dragHandle.tabIndex ?? -1}
          aria-label="Drag to reorder"
          className={
            dragHandle.className ??
            "mt-0.5 text-zinc-300 dark:text-zinc-600 hover:text-zinc-500 dark:hover:text-zinc-400 cursor-grab active:cursor-grabbing transition-colors touch-none flex-shrink-0"
          }
        >
          <GripVertical size={14} />
        </button>
      )}

      <button
        onClick={onEdit}
        className={
          editButtonClassName ??
          "p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all"
        }
        aria-label="Edit task"
      >
        <Pencil size={12} />
      </button>

      <button
        onClick={onDelete}
        className={
          deleteButtonClassName ??
          "p-1 rounded-md text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
        }
        aria-label="Delete task"
      >
        <Trash2 size={12} />
      </button>
    </>
  );
}
