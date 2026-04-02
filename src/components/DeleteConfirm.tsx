import { useEffect } from "react";
import { Trash2, X } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import Modal from "./common/Modal";

export default function DeleteConfirm() {
  const { tasks, deletingId, setDeletingId, deleteTask } = useTaskStore();
  const task = tasks.find((t) => t.id === deletingId);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeletingId(null);
      if (e.key === "Enter" && deletingId) deleteTask(deletingId);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletingId]);

  if (!task) return null;

  return (
    <Modal onClose={() => setDeletingId(null)} customClassName="max-w-sm p-6">
      <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-4">
        <Trash2 size={18} className="text-red-500" />
      </div>

      <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
        Delete task?
      </h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
        "
        <span className="text-zinc-700 dark:text-zinc-300 font-medium">
          {task.title}
        </span>
        " will be permanently removed.
      </p>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-6">
        This action cannot be undone. Press{" "}
        <kbd className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
          Enter
        </kbd>{" "}
        to confirm.
      </p>

      <div className="flex items-center gap-2 justify-end">
        <button onClick={() => setDeletingId(null)} className="btn-ghost">
          <X size={14} /> Cancel
        </button>
        <button onClick={() => deleteTask(task.id)} className="btn-danger">
          <Trash2 size={14} /> Delete
        </button>
      </div>
    </Modal>
  );
}
