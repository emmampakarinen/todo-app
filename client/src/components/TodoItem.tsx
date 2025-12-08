import { Checkbox, FormControl, FormHelperText, IconButton } from "@mui/joy";
import type { Todo } from "../types/todo";
import { useState } from "react";
import { deleteTodoApi } from "../shared/lib/todo";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";

function TodoItem({
  todo,
  onDeleted,
  onEdit,
  onToggle,
}: {
  todo: Todo;
  onDeleted: (id: number) => void;
  onEdit: (todo: Todo) => void;
  onToggle: (id: number, done: boolean) => void;
}) {
  const [deleting, setDeleting] = useState(false);

  const isOverdue =
    todo.dueAt && dayjs(todo.dueAt).isBefore(dayjs(), "day") && !todo.done;

  const handleToggle = () => {
    const newDone = !todo.done;
    onToggle(todo.id, newDone);
  };

  // Delete the todo item
  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteTodoApi(todo.id);
      onDeleted(todo.id); // tell parent to remove from state
    } catch (err) {
      console.error("Failed to delete todo:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`flex items-start justify-between bg-[var(--color-blush-200)] p-3 rounded-lg ${
        isOverdue
          ? "bg-[var(--color-blush-200)] border-3 border-red-600 shadow-lg"
          : "bg-[var(--color-blush-200)] border border-transparent"
      }
      ${
        todo.done
          ? "opacity-50 grayscale bg-[var(--color-blush-100)]"
          : "bg-[var(--color-blush-200)]"
      }`}
    >
      <div className="flex flex-col">
        <FormControl>
          <div
            className={`mb-2 text-sm md:text-base ${
              isOverdue
                ? "text-red-900 font-bold animate-pulse"
                : "text-gray-700"
            }`}
          >
            {todo.dueAt && (
              <span>
                Due: {dayjs(todo.dueAt).format("YYYY-MM-DD")}
                {isOverdue && " ⚠️"}
              </span>
            )}
          </div>
          <Checkbox
            label={todo.title}
            checked={todo.done}
            onChange={handleToggle}
          />
          <FormHelperText>
            {todo.description && <span>{todo.description}</span>}
          </FormHelperText>

          <FormHelperText sx={{ fontSize: "0.65rem", opacity: 0.7 }}>
            Created {dayjs(todo.createdAt).format("YYYY-MM-DD")}
          </FormHelperText>
        </FormControl>
      </div>
      <div className="flex flex-col gap-2 mt-1">
        <IconButton
          disabled={deleting}
          aria-label="delete"
          size="sm"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          disabled={deleting}
          aria-label="edit"
          size="sm"
          onClick={() => onEdit(todo)}
        >
          <EditIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default TodoItem;
