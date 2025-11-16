import { useEffect, useState } from "react";
import type { List } from "../types/list";
import EditTodoModal from "./EditTodoModal";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";
import { IconButton } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteListApi } from "../shared/lib/lists";

function TodoList({
  lists,
  loading,
  onListDeleted,
}: {
  lists: List[];
  loading: boolean;
  onListDeleted: (listId: number) => void;
}) {
  const [editingTodo, setEditing] = useState<Todo | null>(null);
  const [data, setData] = useState<List[]>(lists);

  useEffect(() => setData(lists), [lists]);

  // Show loading state
  if (loading) {
    return <div className="p-4">Loading lists…</div>;
  }

  // Remove todo from state after deletion
  const handleTodoDeleted = (listId: number, todoId: number) => {
    setData((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, todos: l.todos?.filter((t) => t.id !== todoId) ?? [] }
          : l
      )
    );
  };

  // Update todo in state after editing
  const handleTodoEdited = (updated: Todo) => {
    setData((prev) =>
      prev.map((l) =>
        l.id === updated.todoListId
          ? {
              ...l,
              todos: (l.todos ?? []).map((t) =>
                t.id === updated.id ? updated : t
              ),
            }
          : l
      )
    );
  };

  // Update todo in state after editing
  const handleListDelete = async (listId: number) => {
    try {
      await deleteListApi(listId);
      onListDeleted(listId); // tell parent to remove from state
    } catch (err) {
      console.error("Failed to delete list:", err);
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      {data.map((list) => (
        <div
          key={list.id}
          className="border-4 bg-[var(--color-blush-50)] border-white rounded-lg p-3 w-full mb-4"
        >
          <div className="flex flex-row justify-between items-center">
            <div>
              <h2 className="text-xl text-[var(--color-text-red)] font-bold">
                {list.name}
              </h2>
              <p className="text-gray-600">{list.description}</p>
            </div>
            <IconButton
              aria-label="delete"
              size="sm"
              onClick={() => handleListDelete(list.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            {(list.todos?.length ?? 0) > 0 ? (
              list.todos!.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDeleted={(todoId) => handleTodoDeleted(list.id, todoId)}
                  onEdit={(t) => setEditing(t)}
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
      {data.length === 0 && <p>No todo lists available.</p>}
      {editingTodo && (
        <EditTodoModal
          open
          onClose={() => setEditing(null)}
          todo={editingTodo}
          listName={
            data.find((l) => l.id === editingTodo.todoListId)?.name ?? "—" // get list name
          }
          onSaved={(updated) => {
            handleTodoEdited(updated); // updates UI immediately
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

export default TodoList;
