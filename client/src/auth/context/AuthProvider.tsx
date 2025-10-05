import React, { useState } from "react";

import {
  currentUser,
  login as loginApi,
  logout as logoutApi,
} from "../../shared/lib/auth";
import type { LoginData } from "../../types/auth";
import type { User } from "../../types/user";
import { AuthContext } from "./auth-context";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(() => currentUser());

  async function login(data: LoginData) {
    const u = await loginApi(data);
    setUser(u);
  }

  function logout() {
    logoutApi();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
