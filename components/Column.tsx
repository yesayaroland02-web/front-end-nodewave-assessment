type Task = {
  id: string;
  title: string;
  status: string;
};

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
    <div className="bg-gray-100 p-4 rounded">
      <h2 className="font-bold mb-2">{title}</h2>

      {tasks?.map((task) => (
        <div
          key={task.id}
          className="p-2 bg-white rounded mb-2"
          draggable
        >
          {task.title}
        </div>
      ))}
    </div>
  );
}
