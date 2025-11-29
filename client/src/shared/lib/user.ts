import type { User } from "../../types/user";
import { api } from "../api/api";

// update user info (email and username)
export const updateUser = async (
  email: string,
  username: string
): Promise<User> => {
  const response = await api.patch<User>("/update-user", { email, username });

  return response.data;
};
