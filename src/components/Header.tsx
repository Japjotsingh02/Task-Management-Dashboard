import { Sun, Moon, LayoutList, LayoutGrid, Plus } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import logoIconSvg from "../assets/logo-icon.svg";
interface Props {
  onNewTask: () => void;
}

export default function Header({ onNewTask }: Props) {
  const { theme, toggleTheme, viewMode, setViewMode } = useTaskStore();

  return (
    <header className="flex items-center justify-between py-5 px-0">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center">
          <img src={logoIconSvg} alt="TaskFlow" className="w-3.5 h-3.5" />
        </div>
        <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight text-[15px]">
          TaskFlow
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-0.5">
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-md transition-all duration-150 ${
              viewMode === "list"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
            aria-label="List view"
          >
            <LayoutList size={14} />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-1.5 rounded-md transition-all duration-150 ${
              viewMode === "card"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            }`}
            aria-label="Card view"
          >
            <LayoutGrid size={14} />
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="btn-ghost p-2"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
        </button>

        <button onClick={onNewTask} className="btn-primary">
          <Plus size={14} />
          New task
        </button>
      </div>
    </header>
  );
}
