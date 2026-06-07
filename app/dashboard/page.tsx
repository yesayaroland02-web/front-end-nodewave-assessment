"use client";

import { useEffect } from "react";
import { api } from "../../lib/api";
import { useTaskStore } from "../../store/task.store";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useDroppable,
  useDraggable,
} from "@dnd-kit/core";

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

    const taskId = active.id as string;
    const newStatus = over.id as string;

    // 🔥 OPTIMISTIC UPDATE (BIAR SMOOTH)
    const updated = { ...tasks };

    for (const col of columns) {
      updated[col] = updated[col].filter((t) => t.id !== taskId);
    }

    const movedTask = Object.values(tasks)
      .flat()
      .find((t) => t.id === taskId);

    if (movedTask) {
      movedTask.status = newStatus;
      updated[newStatus].push(movedTask);
    }

    setTasks(updated);

    // 🔥 BACKEND UPDATE
    await api.patch(`/tasks/${taskId}/status`, {
      status: newStatus,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Task Board
      </h1>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-4">
          {columns.map((col) => (
            <Column key={col} id={col} tasks={tasks[col] || []} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
