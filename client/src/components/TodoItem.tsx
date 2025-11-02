import { Checkbox, FormControl, FormHelperText } from "@mui/joy";
import type { Todo } from "../types/todo";
import { useState } from "react";
import { toggleTodoDoneApi } from "../shared/lib/todo";

function TodoItem({ todo }: { todo: Todo }) {
  const [done, setDone] = useState(todo.done);

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

  return (
    <div className="flex flex-1 flex-row gap-2 bg-amber-300 p-3 rounded-lg">
      <FormControl>
        <Checkbox label={todo.title} checked={done} onChange={handleToggle} />
        <div>{todo.dueAt && <span>Due: {todo.dueAt}</span>}</div>
        <FormHelperText className="flex flex-col leading-snug">
          {todo.description && <span>{todo.description}</span>}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default TodoItem;
