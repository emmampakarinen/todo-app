import type { ApiResponse } from "../../types/apiresponse";
import type { User } from "../../types/user";
import { api } from "../api/api";

// update user info (email and username)
export const updateUser = async (
  email: string,
  username: string
): Promise<User> => {
  const response = await api.patch<User>("/user/update-user", {
    email,
    username,
  });

  return response.data;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<ApiResponse<string>> => {
  const response = await api.patch<ApiResponse<string>>(
    "/user/change-password",
    {
      oldPassword,
      newPassword,
    }
  );

  return response.data;
};

export const deleteUser = async (): Promise<ApiResponse<string>> => {
  const response = await api.delete<ApiResponse<string>>("/user/delete-user");

  return response.data;
};

export const uploadImage = async (
  formData: FormData
): Promise<ApiResponse<User>> => {
  const response = await api.post<ApiResponse<User>>(
    "/user/add-profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
