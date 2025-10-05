import { Button } from "@mui/joy";
import { Link, NavLink, Outlet } from "react-router-dom";
import { currentUser, logout } from "../shared/lib/auth";

export default function App() {
  const handleLogout = () => {
    logout();
    window.location.href = "/frontpage"; // Redirect to front page after logout
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className=" border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">CheckIt</h1>
        <nav className="flex gap-4">
          <NavLink to="/frontpage" className="hover:underline">
            Home
          </NavLink>
          {currentUser() ? (
            <button
              onClick={handleLogout}
              className="hover:underline text-inherit font-normal"
            >
              Logout
            </button>
          ) : null}
        </nav>
      </header>

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
}
