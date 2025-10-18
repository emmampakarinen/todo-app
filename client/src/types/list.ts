import type { Todo } from "./todo";

export interface List {
  id: number;
  name: string;
  description: string;
  todos?: Todo[];
}

export interface NewList {
  name: string;
  description: string;
}

export interface NewListResponse {
  id: number;
  name: string;
  description: string;
}
