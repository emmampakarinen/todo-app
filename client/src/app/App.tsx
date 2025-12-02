import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { LogOut, ListChecks, User } from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const isLoggedIn = Boolean(user);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-beige-20)]">
      {isLoggedIn ? (
        <header className="bg-[var(--color-blush-200)] border-b p-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl">checkit</h1>
          <nav className="flex gap-4">
            <div className="flex gap-4">
              <NavLink
                style={{ fontSize: 20 }}
                to="/home"
                className="hover:underline"
              >
                <ListChecks size={26} />
              </NavLink>
              <NavLink
                style={{ fontSize: 20 }}
                to="/profile"
                className="hover:underline"
              >
                <User size={26} />
              </NavLink>
              <NavLink
                style={{ fontSize: 20 }}
                onClick={handleLogout}
                to="/"
                className="hover:underline flex items-center gap-2"
              >
                <LogOut size={26} />
              </NavLink>
            </div>
          </nav>
        </header>
      ) : null}

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
}
