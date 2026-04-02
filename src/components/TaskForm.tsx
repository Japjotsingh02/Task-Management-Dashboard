// src/components/TaskForm.tsx
import { useState, useEffect, type SubmitEventHandler } from "react";
import { X, Plus, Save } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import type { TaskFormData, Priority, Task } from "../types";
import { PRIORITY_LABEL, PRIORITY_COLOR } from "../utils/priority";
import Modal from "./common/Modal";

interface Props {
  editTask?: Task;
  onClose: () => void;
}

const PRIORITIES: Priority[] = ["low", "medium", "high"];

const EMPTY: TaskFormData = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: new Date().toISOString().split("T")[0],
};

interface ValidationErrors {
  title?: string;
  dueDate?: string;
}

export default function TaskForm({ editTask, onClose }: Props) {
  const { addTask, updateTask } = useTaskStore();
  const [form, setForm] = useState<TaskFormData>(editTask ?? EMPTY);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [disabled, setDisabled] = useState(false);

  const isEdit = !!editTask;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (): boolean => {
    const validationErrors: typeof errors = {};
    if (!form.title.trim()) validationErrors.title = "Title is required";
    if (!form.dueDate) validationErrors.dueDate = "Due date is required";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setDisabled(true);
    // Just to make it look like an API call
    await new Promise((resolve) => setTimeout(resolve, 120));
    if (isEdit) {
      updateTask(editTask.id, form);
    } else {
      addTask(form);
    }
    setDisabled(false);
    onClose();
  };

  const set = (key: keyof TaskFormData, value: TaskFormData[typeof key]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <Modal onClose={onClose} customClassName="max-w-md">
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
          {isEdit ? "Edit task" : "New task"}
        </h2>
        <button
          onClick={onClose}
          className="btn-ghost p-1.5 -mr-1"
          title="Close"
        >
          <X size={16} aria-label="Close form" />
        </button>
      </div>

      <form onSubmit={handleSubmit} noValidate className="px-6 py-5 space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            className={`input ${errors.title ? "border-red-400 dark:border-red-600 focus:ring-red-400/30" : ""}`}
            placeholder="What needs to be done?"
            maxLength={120}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1 animate-fade-in">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className="input resize-none h-20 leading-relaxed"
            placeholder="Add some details…"
            maxLength={500}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
              Priority
            </label>
            <div className="flex gap-1.5">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => set("priority", p)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all duration-150 ${
                    form.priority === p
                      ? `${PRIORITY_COLOR[p]} border-current bg-current/5`
                      : "text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                  }`}
                >
                  {PRIORITY_LABEL[p]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5">
              Due date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              placeholder="DD-MM-YYYY"
              value={form.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
              className={`input font-mono text-xs ${errors.dueDate ? "border-red-400 dark:border-red-600" : ""}`}
            />
            {errors.dueDate && (
              <p className="text-xs text-red-500 mt-1">{errors.dueDate}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button type="submit" disabled={disabled} className="btn-primary">
            {disabled ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white dark:border-zinc-900/30 dark:border-t-zinc-900 rounded-full animate-spin" />
            ) : isEdit ? (
              <>
                <Save size={14} /> Save changes
              </>
            ) : (
              <>
                <Plus size={14} /> Add task
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
