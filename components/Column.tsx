"use client";

import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";

export default function Column({
  id,
  title,
  tasks,
}: {
  id: string;
  title: string;
  tasks: Task[];
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-3 rounded min-h-[400px]"
    >
      <h2 className="font-bold mb-3">{title}</h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}