import React from "react";
import AuthProvider from "../auth/context/AuthProvider";

// Wraps all providers
export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
