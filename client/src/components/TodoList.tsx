import type { List } from "../types/list";
import TodoItem from "./TodoItem";

function TodoList({
  lists,
  loading,
  onTodoDeleted,
}: {
  lists: List[];
  loading: boolean;
  onTodoDeleted: (listId: number, todoId: number) => void;
}) {
  // Show loading state
  if (loading) {
    return <div className="p-4">Loading lists…</div>;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      {lists.map((list) => (
        <div
          key={list.id}
          className="border-4 bg-[var(--color-blush-50)] border-white rounded-lg p-3 w-full mb-4"
        >
          <h2 className="text-xl text-[var(--color-text-red)] font-bold">
            {list.name}
          </h2>
          <p className="text-gray-600">{list.description}</p>
          <div className="flex flex-col gap-2 mt-2">
            {(list.todos?.length ?? 0) > 0 ? (
              list.todos!.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDeleted={(todoId) => onTodoDeleted(list.id, todoId)}
                />
              ))
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
