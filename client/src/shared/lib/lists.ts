import type { List, NewList, NewListResponse } from "../../types/list";
import { api } from "../api/api";

// Create a new todo list
export const createListApi = async (data: NewList): Promise<List> => {
  const response = await api.post<NewListResponse>("/lists", data);
  return response.data;
};

// Get all todo lists
export const getListsApi = async (): Promise<List[]> => {
  const response = await api.get<List[]>("/lists");
  return response.data;
};
