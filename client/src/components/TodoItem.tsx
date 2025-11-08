import { Checkbox, FormControl, FormHelperText, IconButton } from "@mui/joy";
import type { Todo } from "../types/todo";
import { useState } from "react";
import { deleteTodoApi, toggleTodoDoneApi } from "../shared/lib/todo";
import DeleteIcon from "@mui/icons-material/Delete";

function TodoItem({
  todo,
  onDeleted,
}: {
  todo: Todo;
  onDeleted: (id: number) => void;
}) {
  const [done, setDone] = useState(todo.done);
  const [deleting, setDeleting] = useState(false);

  // Toggle the done status of the todo item
  const handleToggle = async () => {
    const newDone = !done;
    setDone(newDone);
    try {
      await toggleTodoDoneApi(todo.id, newDone);
    } catch (err) {
      console.error("Failed to toggle todo:", err);
      setDone(!newDone); // reverting if request failed
    }
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
    <div className="flex items-start justify-between bg-[var(--color-blush-200)] p-3 rounded-lg">
      <div className="flex flex-col">
        <FormControl>
          <div className="mb-2">
            {todo.dueAt && <span>Due: {todo.dueAt}</span>}
          </div>
          <Checkbox label={todo.title} checked={done} onChange={handleToggle} />
          <FormHelperText>
            {todo.description && <span>{todo.description}</span>}
          </FormHelperText>
        </FormControl>
      </div>

      <IconButton
        disabled={deleting}
        aria-label="delete"
        size="sm"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </div>
  );
}

export default TodoItem;
