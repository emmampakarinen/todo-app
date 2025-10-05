import { createContext } from "react";
import type { User } from "../../types/user";
import type { LoginData } from "../../types/auth";

export type AuthCtx = {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthCtx | undefined>(undefined);
