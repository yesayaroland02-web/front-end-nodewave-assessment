import { create } from "zustand";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTask: (task: Task) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  updateTask: (updated) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updated.id ? updated : t
      ),
    })),
}));