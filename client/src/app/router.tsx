import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App"; // contains header/nav + <Outlet/>
import RequireAuth from "../auth/components/RequireAuth";

import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { FrontPage } from "../pages/FrontPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  // public routes (no App layout)

  // everything below uses the App layout
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/frontpage", element: <FrontPage /> },

      // protect everything inside this group
      {
        element: <RequireAuth />,
        children: [{ path: "home", element: <div>Home</div> }],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
