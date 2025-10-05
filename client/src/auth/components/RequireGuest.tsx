// auth/components/RequireGuest.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireGuest({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const authed = Boolean(user);
  return authed ? <Navigate to="/home" replace /> : <>{children}</>;
}
// This component redirects authenticated users away from guest-only pages
