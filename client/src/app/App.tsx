import { NavLink, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className=" border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">CheckIt</h1>
        <nav className="flex gap-4">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
        </nav>
      </header>

      <main className="flex flex-col flex-1">
        <Outlet />
      </main>
    </div>
  );
}
