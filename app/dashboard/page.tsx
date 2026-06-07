"use client";

import { useEffect } from "react";
import { api } from "../../lib/api";
import { useTaskStore } from "../../store/task.store";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import Column from "../../components/Column";

const columns = ["TODO", "IN_PROGRESS", "DONE"] as const;

export default function DashboardPage() {
  const { tasks, setTasks } = useTaskStore();

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const updated = { ...tasks };

    for (const col of columns) {
      updated[col] = updated[col].filter((t) => t.id !== taskId);
    }

    const moved = Object.values(tasks)
      .flat()
      .find((t) => t.id === taskId);

    if (moved) {
      moved.status = newStatus;
      updated[newStatus].push(moved);
    }

    setTasks(updated);

    await api.patch(`/tasks/${taskId}/status`, {
      status: newStatus,
    });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-3 gap-4 p-6">
        {columns.map((col) => (
          <Column key={col} id={col} tasks={tasks[col] || []} />
        ))}
      </div>
    </DndContext>
  );
}
