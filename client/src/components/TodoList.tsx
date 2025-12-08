import { useEffect, useState } from "react";
import type { List } from "../types/list";
import EditTodoModal from "./EditTodoModal";
import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";
import {
  IconButton,
  Checkbox,
  Select,
  Option,
  FormControl,
  FormLabel,
} from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteListApi } from "../shared/lib/lists";
import { toggleTodoDoneApi } from "../shared/lib/todo";
import { sortTodos } from "../shared/utils/sortTodos";

type TodoSort =
  | "position"
  | "due-asc"
  | "due-desc"
  | "created-newest"
  | "created-oldest";

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
  const [selectedListId, setSelectedListId] = useState<number | "all">("all");
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState<TodoSort>("position");

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

  // Toggle the done status of the todo item
  const handleTodoToggle = async (
    listId: number,
    todoId: number,
    done: boolean
  ) => {
    try {
      await toggleTodoDoneApi(todoId, done);
      setData((prev) =>
        prev.map((l) =>
          l.id === listId
            ? {
                ...l,
                todos: (l.todos ?? []).map((t) =>
                  t.id === todoId ? { ...t, done } : t
                ),
              }
            : l
        )
      );
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const visibleLists = data.filter((l) =>
    selectedListId === "all" ? true : l.id === selectedListId
  );

  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <FormControl size="sm" className="min-w-[200px]">
            <FormLabel>Sort todos by</FormLabel>
            <Select
              value={sortBy}
              onChange={(_, value) => {
                if (!value) return;
                setSortBy(value as TodoSort);
              }}
            >
              <Option value="position">Position</Option>
              <Option value="due-asc">Due date (earliest first)</Option>
              <Option value="due-desc">Due date (latest first)</Option>
              <Option value="created-newest">Created (newest first)</Option>
              <Option value="created-oldest">Created (oldest first)</Option>
            </Select>
          </FormControl>

          <FormControl size="sm" orientation="horizontal">
            <div className="flex items-center gap-2 sm:mt-5">
              <Checkbox
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                label="Show completed todos"
              />
            </div>
          </FormControl>
        </div>

        <FormControl size="sm" className="w-full sm:w-48">
          <FormLabel>List</FormLabel>
          <Select
            value={selectedListId === "all" ? "all" : String(selectedListId)}
            onChange={(_, value) => {
              if (!value) return;
              setSelectedListId(value === "all" ? "all" : Number(value));
            }}
          >
            <Option value="all">All lists</Option>
            {data.map((list) => (
              <Option key={list.id} value={String(list.id)}>
                {list.name}
              </Option>
            ))}
          </Select>
        </FormControl>
      </div>

      {visibleLists.map((list) => (
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
              sortTodos(
                (list.todos ?? []).filter((todo) =>
                  showCompleted ? true : !todo.done
                ),
                sortBy
              ).map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDeleted={(todoId) => handleTodoDeleted(list.id, todoId)}
                  onEdit={(t) => setEditing(t)}
                  onToggle={(id, done) => handleTodoToggle(list.id, id, done)}
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

      {visibleLists.length === 0 && <p>No todo lists available.</p>}

      {editingTodo && (
        <EditTodoModal
          open
          onClose={() => setEditing(null)}
          todo={editingTodo}
          listName={
            data.find((l) => l.id === editingTodo.todoListId)?.name ?? "—"
          }
          onSaved={(updated) => {
            handleTodoEdited(updated);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

export default TodoList;
