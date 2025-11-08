import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

export default function App() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/frontpage", { replace: true });
  };

  const isLoggedIn = Boolean(user);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[var(--color-blush-200)] border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-3xl">CheckIt</h1>
        <nav className="flex gap-4">
          {isLoggedIn ? (
            <div className="flex gap-4">
              <NavLink to="/home" className="hover:underline">
                Home
              </NavLink>
              <NavLink
                onClick={handleLogout}
                to="/"
                className="hover:underline"
              >
                Logout
              </NavLink>
            </div>
          ) : null}
        </nav>
      </header>

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
}
