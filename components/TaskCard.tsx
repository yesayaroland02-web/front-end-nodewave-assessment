import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      className="p-2 bg-white rounded shadow mb-2 cursor-grab active:cursor-grabbing"
    >
      {task.title}
    </div>
  );
}
