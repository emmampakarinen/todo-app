import type { Todo } from "../../types/todo";

export type TodoSort =
  | "position"
  | "due-asc"
  | "due-desc"
  | "created-newest"
  | "created-oldest";

export function sortTodos(todos: Todo[], sortBy: TodoSort): Todo[] {
  const copy = [...todos];

  return copy.sort((a, b) => {
    switch (sortBy) {
      case "due-asc": {
        if (!a.dueAt && !b.dueAt) return 0;
        if (!a.dueAt) return 1;
        if (!b.dueAt) return -1;
        return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
      }
      case "due-desc": {
        if (!a.dueAt && !b.dueAt) return 0;
        if (!a.dueAt) return 1;
        if (!b.dueAt) return -1;
        return new Date(b.dueAt).getTime() - new Date(a.dueAt).getTime();
      }
      case "created-newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "created-oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "position":
      default:
        return a.position - b.position;
    }
  });
}
