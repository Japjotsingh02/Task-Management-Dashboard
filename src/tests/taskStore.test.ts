import { act } from '@testing-library/react';
import { useTaskStore } from '../store/taskStore'

beforeEach(() => {
  useTaskStore.setState({ 
    tasks: [],
    filter: { search: "", status: "all", priority: "all" },
    viewMode: "list",
    theme: "light",
    editingId: null,
    deletingId: null,
  });
});

describe("Task store", () => {
  it("should add a task", () => {
    act(() => {
      useTaskStore.getState().addTask({
        title: "Test task",
        description: "Some description",
        priority: "high",
        dueDate: "2025-12-31",
      });
    });

    const tasks = useTaskStore.getState().tasks;

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe("Test task");
    expect(tasks[0].status).toBe("pending");
  });

  it("should toggle task status", () => {
    act(() => {
      useTaskStore.getState().addTask({
        title: "Toggle me",
        description: "",
        priority: "low",
        dueDate: "2025-01-01",
      });
    });

    const id = useTaskStore.getState().tasks[0].id;

    act(() => {
      useTaskStore.getState().toggleStatus(id);
    });

    expect(useTaskStore.getState().tasks[0].status).toBe("completed");
  });

  it("should delete a task", () => {
    act(() => {
      useTaskStore.getState().addTask({
        title: "Task 1",
        description: "",
        priority: "low",
        dueDate: "2025-01-01",
      });

      useTaskStore.getState().addTask({
        title: "Task 2",
        description: "",
        priority: "low",
        dueDate: "2025-01-01",
      });
    });

    const id = useTaskStore.getState().tasks[0].id;

    act(() => {
      useTaskStore.getState().deleteTask(id);
    });

    const tasks = useTaskStore.getState().tasks;

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe("Task 2");
  });

  it("should update a task", () => {
    act(() => {
      useTaskStore.getState().addTask({
        title: "Old title",
        description: "desc",
        priority: "low",
        dueDate: "2025-01-01",
      });
    });

    const id = useTaskStore.getState().tasks[0].id;

    act(() => {
      useTaskStore.getState().updateTask(id, {
        title: "New title",
      });
    });

    const task = useTaskStore.getState().tasks[0];

    expect(task.title).toBe("New title");
    expect(task.description).toBe("desc"); // unchanged
  });

  it("should filter tasks by search", () => {
    act(() => {
      useTaskStore.getState().addTask({
        title: "Buy milk",
        description: "",
        priority: "low",
        dueDate: "2025-01-01",
      });

      useTaskStore.getState().addTask({
        title: "Fix bug",
        description: "",
        priority: "high",
        dueDate: "2025-01-01",
      });
    });

    act(() => {
      useTaskStore.getState().setSearch("fix");
    });

    const filtered = useTaskStore.getState().filteredTasks();

    expect(filtered.length).toBe(1);
    expect(filtered[0].title).toBe("Fix bug");
  });
});