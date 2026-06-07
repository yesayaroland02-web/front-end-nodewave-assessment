import { useDroppable } from "@dnd-kit/core";

export default function Column({ id, tasks }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded min-h-[400px]">
      <h2 className="font-bold mb-3">{id}</h2>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
