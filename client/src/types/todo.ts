export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  listId: number;
}

export interface NewTodo {
  title: string;
  completed?: boolean;
  dueDate?: string;
}
