import { useState, useEffect } from "react";
import { useTaskStore } from "./store/taskStore";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import FilterBar from "./components/FilterBar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import DeleteConfirm from "./components/DeleteConfirm";

export default function App() {
  const { theme, tasks, editingId, deletingId, setEditingId } = useTaskStore();
  const [showForm, setShowForm] = useState(false);

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const editTask = editingId
    ? tasks.find((t) => t.id === editingId)
    : undefined;

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <Header onNewTask={() => setShowForm(true)} />

        <div className="mb-5 animate-slide-down">
          <StatsBar />
        </div>

        <div
          className="mb-4 animate-slide-down"
          style={{ animationDelay: "60ms", animationFillMode: "backwards" }}
        >
          <FilterBar />
        </div>

        <TaskList />
      </div>

      {(showForm || editingId) && (
        <TaskForm editTask={editTask} onClose={handleCloseForm} />
      )}

      {deletingId && <DeleteConfirm />}
    </div>
  );
}
