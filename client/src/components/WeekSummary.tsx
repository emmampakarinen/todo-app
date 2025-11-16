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
    <div className="h-full rounded-lg border-4 bg-[var(--color-blush-100)] border-[var(--color-blush-300)] p-4">
      <TodoList lists={lists} loading={loading} onListDeleted={onListDeleted} />
    </div>
  );
}

export default WeekSummary;
