import { clearAuth, getUser, setAuth } from "./token";
import type { AuthResponse, LoginData, RegisterData } from "../../types/auth";
import type { User } from "../../types/user";
import { api } from "../api/api";

// Register a new user
export const register = async (data: RegisterData): Promise<User> => {
  const response = await api.post<User>("/auth/register", data);
  return response.data;
};

// Login an existing user
export const login = async (data: LoginData): Promise<User> => {
  // return token and user info
  const response = await api.post<AuthResponse>("/auth/login", data);
  setAuth(response.data.token, response.data.user); // store in localStorage
  return response.data.user;
};

// Logout the current user
export const logout = async (): Promise<void> => {
  clearAuth();
};

// Get the currently authenticated user
export const currentUser = (): User => {
  const user = getUser();
  return user as User;
};
