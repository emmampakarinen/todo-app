import { createBrowserRouter } from "react-router-dom";
import App from "./App"; // contains header/nav + <Outlet/>
import RequireAuth from "../auth/components/RequireAuth";

import { LoginPage } from "../auth/pages/LoginPage";
import { RegisterPage } from "../auth/pages/RegisterPage";
import { FrontPage } from "../pages/FrontPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import RequireGuest from "../auth/components/RequireGuest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public landing
      { index: true, element: <FrontPage /> },

      // Guests only (if logged in push to /home)
      {
        path: "login",
        element: (
          <RequireGuest>
            <LoginPage />
          </RequireGuest>
        ),
      },
      {
        path: "register",
        element: (
          <RequireGuest>
            <RegisterPage />
          </RequireGuest>
        ),
      },

      // Protected area
      {
        element: <RequireAuth />,
        children: [{ path: "home", element: <HomePage /> }],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
