import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-4 py-3">
        <nav className="flex gap-4">
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
          >
            Register
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
