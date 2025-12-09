import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "../index.css";
import Providers from "./providers";
import { ToastProvider } from "../auth/context/ToastProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </Providers>
  </StrictMode>
);
