import { act } from "@testing-library/react";
import { useTaskStore } from "../store/taskStore";

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

describe("addTask", () => {
  it("adds a task with correct defaults", () => {
    act(() => {
      useTaskStore.getState().addTask({
        title: "Test task",
        description: "A description",
        priority: "high",
        dueDate: "2025-12-31",
      });
    });
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Test task");
    expect(tasks[0].status).toBe("pending");
    expect(tasks[0].priority).toBe("high");
    expect(tasks[0].order).toBe(0);
  });

  it("increments order on each addition", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "T1",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "T2",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "T3",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    const { tasks } = useTaskStore.getState();
    expect(tasks.map((t) => t.order)).toEqual([0, 1, 2]);
  });
});

describe("toggleStatus", () => {
  it("toggles pending → completed", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "T",
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

  it("toggles completed → pending", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "T",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    const id = useTaskStore.getState().tasks[0].id;
    act(() => {
      useTaskStore.getState().toggleStatus(id);
      useTaskStore.getState().toggleStatus(id);
    });
    expect(useTaskStore.getState().tasks[0].status).toBe("pending");
  });
});

describe("updateTask", () => {
  it("updates only specified fields", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "Original",
          description: "Desc",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    const id = useTaskStore.getState().tasks[0].id;
    act(() => {
      useTaskStore
        .getState()
        .updateTask(id, { title: "Updated", priority: "high" });
    });
    const task = useTaskStore.getState().tasks[0];
    expect(task.title).toBe("Updated");
    expect(task.priority).toBe("high");
    expect(task.description).toBe("Desc"); // unchanged
  });
});

describe("deleteTask", () => {
  it("removes task by id", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "T1",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "T2",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    const id = useTaskStore.getState().tasks[0].id;
    act(() => {
      useTaskStore.getState().deleteTask(id);
    });
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("T2");
  });

  it("re-orders remaining tasks after deletion", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "T1",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "T2",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "T3",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    const id = useTaskStore.getState().tasks[1].id;
    act(() => {
      useTaskStore.getState().deleteTask(id);
    });
    const { tasks } = useTaskStore.getState();
    expect(tasks.map((t) => t.order)).toEqual([0, 1]);
  });

  it("clears deletingId after deletion", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "T",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    const id = useTaskStore.getState().tasks[0].id;
    act(() => {
      useTaskStore.getState().setDeletingId(id);
      useTaskStore.getState().deleteTask(id);
    });
    expect(useTaskStore.getState().deletingId).toBeNull();
  });
});

describe("filteredTasks", () => {
  beforeEach(() => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "Buy groceries",
          description: "milk and eggs",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "Fix bug",
          description: "login issue",
          priority: "high",
          dueDate: "2025-01-02",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "Write tests",
          description: "jest setup",
          priority: "medium",
          dueDate: "2025-01-03",
        });
    });
    // Complete one task
    const id = useTaskStore.getState().tasks[2].id;
    act(() => {
      useTaskStore.getState().toggleStatus(id);
    });
  });

  it("returns all tasks by default", () => {
    expect(useTaskStore.getState().filteredTasks()).toHaveLength(3);
  });

  it("filters by search query (title)", () => {
    act(() => {
      useTaskStore.getState().setSearch("bug");
    });
    expect(useTaskStore.getState().filteredTasks()).toHaveLength(1);
    expect(useTaskStore.getState().filteredTasks()[0].title).toBe("Fix bug");
  });

  it("filters by search query (description)", () => {
    act(() => {
      useTaskStore.getState().setSearch("milk");
    });
    expect(useTaskStore.getState().filteredTasks()).toHaveLength(1);
  });

  it("filters by status = completed", () => {
    act(() => {
      useTaskStore.getState().setStatusFilter("completed");
    });
    const filtered = useTaskStore.getState().filteredTasks();
    expect(filtered.every((t) => t.status === "completed")).toBe(true);
  });

  it("filters by status = pending", () => {
    act(() => {
      useTaskStore.getState().setStatusFilter("pending");
    });
    const filtered = useTaskStore.getState().filteredTasks();
    expect(filtered.every((t) => t.status === "pending")).toBe(true);
  });

  it("filters by priority = high", () => {
    act(() => {
      useTaskStore.getState().setPriorityFilter("high");
    });
    const filtered = useTaskStore.getState().filteredTasks();
    expect(filtered).toHaveLength(1);
    expect(filtered[0].priority).toBe("high");
  });

  it("combines search + priority filter", () => {
    act(() => {
      useTaskStore.getState().setSearch("fix");
      useTaskStore.getState().setPriorityFilter("high");
    });
    expect(useTaskStore.getState().filteredTasks()).toHaveLength(1);
  });

  it("returns empty array when nothing matches", () => {
    act(() => {
      useTaskStore.getState().setSearch("zzznomatch");
    });
    expect(useTaskStore.getState().filteredTasks()).toHaveLength(0);
  });
});

describe("taskCounts", () => {
  it("returns correct counts", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "T1",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "T2",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "T3",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    const id = useTaskStore.getState().tasks[0].id;
    act(() => {
      useTaskStore.getState().toggleStatus(id);
    });

    const counts = useTaskStore.getState().taskCounts();
    expect(counts.total).toBe(3);
    expect(counts.completed).toBe(1);
    expect(counts.pending).toBe(2);
  });

  it("returns zeros when no tasks", () => {
    const counts = useTaskStore.getState().taskCounts();
    expect(counts).toEqual({ total: 0, pending: 0, completed: 0 });
  });
});

describe("reorderTasks", () => {
  it("moves task from index to another", () => {
    act(() => {
      useTaskStore
        .getState()
        .addTask({
          title: "A",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "B",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
      useTaskStore
        .getState()
        .addTask({
          title: "C",
          description: "",
          priority: "low",
          dueDate: "2025-01-01",
        });
    });
    act(() => {
      useTaskStore.getState().reorderTasks(0, 2);
    });
    const titles = useTaskStore.getState().tasks.map((t) => t.title);
    expect(titles).toEqual(["B", "C", "A"]);
  });
});

describe("ui state", () => {
  it("toggles theme light → dark → light", () => {
    expect(useTaskStore.getState().theme).toBe("light");
    act(() => {
      useTaskStore.getState().toggleTheme();
    });
    expect(useTaskStore.getState().theme).toBe("dark");
    act(() => {
      useTaskStore.getState().toggleTheme();
    });
    expect(useTaskStore.getState().theme).toBe("light");
  });

  it("sets view mode", () => {
    act(() => {
      useTaskStore.getState().setViewMode("card");
    });
    expect(useTaskStore.getState().viewMode).toBe("card");
  });
});

describe("resetFilters", () => {
  it("clears all active filters", () => {
    act(() => {
      useTaskStore.getState().setSearch("test");
      useTaskStore.getState().setStatusFilter("completed");
      useTaskStore.getState().setPriorityFilter("high");
      useTaskStore.getState().resetFilters();
    });
    const { filter } = useTaskStore.getState();
    expect(filter.search).toBe("");
    expect(filter.status).toBe("all");
    expect(filter.priority).toBe("all");
  });
});
