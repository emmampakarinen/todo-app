import type { List, NewList, NewListResponse } from "../../types/list";
import { api } from "../api/api";

export const createListApi = async (data: NewList): Promise<List> => {
  const response = await api.post<NewListResponse>("/lists", data);
  return response.data;
};
