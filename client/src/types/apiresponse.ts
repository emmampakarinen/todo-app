import type { User } from "./user";

export type ApiResponse<T> = {
  message: string;
  data: T;
  status: "success" | "error";
};

export interface AuthPayload {
  token: string;
  user: User;
}
