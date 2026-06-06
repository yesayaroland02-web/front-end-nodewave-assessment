import { Task } from "../store/task.store";

export default function Column({
  id,
  title,
  tasks,
}: {
  id: string;
  title: string;
  tasks: Task[];
}) {
  return (
    <div className="bg-gray-100 p-4 rounded min-h-[200px]">
      <h2 className="font-bold mb-2">{title}</h2>

      {tasks?.map((task) => (
        <div
          key={task.id}
          className="p-2 bg-white rounded mb-2 shadow"
          draggable
        >
          {task.title}
        </div>
      ))}
    </div>
  );
}
