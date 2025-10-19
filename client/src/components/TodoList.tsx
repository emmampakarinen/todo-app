import Todo from "./Todo";
import type { List } from "../types/list";

function TodoList({ lists, loading }: { lists: List[]; loading: boolean }) {
  // Show loading state
  if (loading) {
    return <div className="p-4">Loading lists…</div>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      {lists.map((list) => (
        <div key={list.id} className="border rounded-lg p-3 w-full mb-4">
          <h2 className="text-xl font-bold">{list.name}</h2>
          <p className="text-gray-600">{list.description}</p>
          <div className="flex flex-col gap-2 mt-2"></div>
          <Todo />
        </div>
      ))}
      {lists.length === 0 && <p>No todo lists available.</p>}
    </div>
  );
}

export default TodoList;
