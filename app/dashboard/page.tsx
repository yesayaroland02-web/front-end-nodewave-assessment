"use client";

import { useEffect } from "react";
import { api } from "../../lib/api";
import { useTaskStore } from "../../store/task.store";
import Column from "../../components/Column";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

export default function DashboardPage() {
  const { tasks, setTasks } = useTaskStore();

  const fetchTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data); // ✅ FIX: tidak pakai .data.data
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    await api.patch(`/tasks/${taskId}/status`, {
      status: newStatus,
    });

    fetchTasks();
  };

  const columns: ("TODO" | "IN_PROGRESS" | "DONE")[] = [
    "TODO",
    "IN_PROGRESS",
    "DONE",
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Task Board (Dependency Lock)
      </h1>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-4">
          {columns.map((col) => (
            <Column
              key={col}
              id={col}
              title={col}
              tasks={tasks[col] ?? []} // ✅ FIX UTAMA
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
