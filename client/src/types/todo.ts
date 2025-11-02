export interface Todo {
  id: number;
  todoList: number;
  title: string;
  description?: string;
  done: boolean;
  position: number;
  dueAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewTodo {
  title: string;
  todoListId: number;
  description?: string;
  dueAt?: string;
}
