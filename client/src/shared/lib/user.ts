import type { ApiResponse } from "../../types/apiresponse";
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

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<ApiResponse<string>> => {
  const response = await api.patch<ApiResponse<string>>("/change-password", {
    oldPassword,
    newPassword,
  });

  return response.data;
};
