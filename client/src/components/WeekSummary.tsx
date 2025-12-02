import TodoList from "./TodoList";
import type { List } from "../types/list";

function WeekSummary({
  lists,
  loading,
  onListDeleted,
}: {
  lists: List[];
  loading: boolean;
  onListDeleted: (listId: number) => void;
}) {
  return (
    <div className="h-full rounded-lg border-4 bg-[var(--color-blush-100)] border-[var(--color-blush-300)] p-4 max-w-4xl mx-auto w-full">
      <div className="max-h-[70vh] overflow-y-auto pr-2">
        <TodoList
          lists={lists}
          loading={loading}
          onListDeleted={onListDeleted}
        />
      </div>
    </div>
  );
}

export default WeekSummary;
