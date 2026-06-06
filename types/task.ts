export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskDependency = {
  dependsOn: {
    id: string;
    status: TaskStatus;
  };
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dependencies?: TaskDependency[];
};
