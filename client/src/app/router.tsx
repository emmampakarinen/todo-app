import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { NotFoundPage } from "../features/pages/NotFoundPage";
import HomePage from "../features/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // layout with header/nav + <Outlet/>
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
