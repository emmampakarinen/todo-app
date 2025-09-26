import type { RegisterData } from "../types/auth";
import type { User } from "../types/user";
import { api } from "./api";

export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};
