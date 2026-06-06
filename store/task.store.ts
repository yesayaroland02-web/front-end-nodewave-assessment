import { create } from "zustand";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
};

type TaskStore = {
  tasks: {
    TODO: Task[];
    IN_PROGRESS: Task[];
    DONE: Task[];
  };

  setTasks: (tasks: TaskStore["tasks"]) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  },

  setTasks: (tasks) => set({ tasks }),
}));
