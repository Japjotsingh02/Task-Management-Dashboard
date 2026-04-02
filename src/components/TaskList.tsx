import { useCallback } from "react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { useTaskStore } from "../store/taskStore";
import TaskRow from "./TaskRow";
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import type { Task } from "../types";

export default function TaskList() {
  const { filteredTasks, reorderTasks, viewMode, tasks } = useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const filtered = filteredTasks();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const task = tasks.find((t) => t.id === event.active.id);
      setActiveTask(task ?? null);
    },
    [tasks],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveTask(null);
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const allIds = tasks.map((t) => t.id);
      const fromIdx = allIds.indexOf(active.id as string);
      const toIdx = allIds.indexOf(over.id as string);
      if (fromIdx !== -1 && toIdx !== -1) reorderTasks(fromIdx, toIdx);
    },
    [tasks, reorderTasks],
  );

  if (filtered.length === 0) return <EmptyState />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={filtered.map((task) => task.id)}
        strategy={
          viewMode === "list"
            ? verticalListSortingStrategy
            : rectSortingStrategy
        }
      >
        {viewMode === "list" ? (
          <div className="surface rounded-xl overflow-hidden">
            {filtered.map((task, i) => (
              <TaskRow key={task.id} task={task} index={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} />
            ))}
          </div>
        )}
      </SortableContext>

      <DragOverlay>
        {activeTask && viewMode === "list" && (
          <div className="surface rounded-xl shadow-2xl opacity-95 rotate-1 scale-[1.02]">
            <TaskRow task={activeTask} index={0} />
          </div>
        )}
        {activeTask && viewMode === "card" && (
          <div className="rotate-2 scale-105 shadow-2xl opacity-90">
            <TaskCard task={activeTask} index={0} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
