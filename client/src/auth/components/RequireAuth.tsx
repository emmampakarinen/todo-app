import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Protects routes that require authentication
export default function RequireAuth() {
  const { user } = useAuth(); // destructure user from auth context

  // redirects to login if no user
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />; // renders child routes if user is present
}
