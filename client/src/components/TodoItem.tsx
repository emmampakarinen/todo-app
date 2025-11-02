import { Checkbox, FormControl, FormHelperText } from "@mui/joy";
import type { Todo } from "../types/todo";

function TodoItem({ todo }: { todo: Todo }) {
  return (
    <div className="flex flex-1 flex-row gap-2">
      <FormControl>
        <Checkbox label={todo.title} checked={todo.done} readOnly />
        <FormHelperText>
          {todo.dueAt ? `Due: ${todo.dueAt}` : todo.description || ""}
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default TodoItem;
