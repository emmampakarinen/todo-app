import type { List } from "../types/list";
import TodoItem from "./TodoItem";

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
          <div className="flex flex-col gap-2 mt-2">
            {(list.todos?.length ?? 0) > 0 ? (
              list.todos!.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <p className="text-sm text-gray-500 italic">
                No todos in this list.
              </p>
            )}
          </div>
        </div>
      ))}
      {lists.length === 0 && <p>No todo lists available.</p>}
    </div>
  );
}

export default TodoList;
