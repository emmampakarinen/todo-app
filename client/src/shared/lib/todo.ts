import type { NewTodo, Todo } from "../../types/todo";
import { api } from "../api/api";

// Create a new todo list
export const createTodoApi = async (data: NewTodo): Promise<Todo> => {
  const response = await api.post<Todo>("/todos", data);
  return response.data;
};

export const toggleTodoDoneApi = async (
  id: number,
  done: boolean
): Promise<Todo> => {
  const response = await api.patch<Todo>(`/todos/${id}/done/${done}`);
  return response.data;
};

// Get all todo lists
export const getTodosApi = async (listId: number): Promise<Todo[]> => {
  const response = await api.get<Todo[]>(`/lists/${listId}/todos`);
  return response.data;
};
