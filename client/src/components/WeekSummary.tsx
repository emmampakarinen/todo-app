import TodoList from "./TodoList";
import type { List } from "../types/list";

function WeekSummary({ lists, loading }: { lists: List[]; loading: boolean }) {
  return (
    <div className="h-full rounded-lg border-4 border-pink-600 p-4">
      <TodoList lists={lists} loading={loading} />
    </div>
  );
}

export default WeekSummary;
