"use client";

import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../types/task";

export default function TaskCard({ task }: { task: Task }) {
  const isBlocked =
    task.dependencies?.some(
      (dep) => dep.dependsOn.status !== "DONE"
    ) ?? false;

  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
      disabled: isBlocked, // 🔥 LOCK DRAG
    });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 rounded shadow mb-3 cursor-grab transition ${
        isBlocked
          ? "bg-red-100 opacity-60 cursor-not-allowed"
          : "bg-white"
      }`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">
        {task.description}
      </p>

      {isBlocked && (
        <p className="text-xs text-red-600 mt-2">
          🔒 Blocked by dependency
        </p>
      )}
    </div>
  );
}