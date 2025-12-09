import { useState, type ReactNode } from "react";
import Snackbar from "@mui/joy/Snackbar";
import { ToastContext, type ToastContextValue } from "./ToastContext";

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast: ToastContextValue["showToast"] = (msg = "neutral") => {
    setMessage(msg);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Snackbar
        variant="solid"
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        animationDuration={200}
        sx={{
          textAlign: "center",
          fontWeight: 600,
          color: "#000000",
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "#EE6983",
          transform: open ? "translateY(0)" : "translateY(16px)",
          opacity: open ? 1 : 0,
          transition: "transform 200ms ease-out, opacity 200ms ease-out",
        }}
      >
        {message}
      </Snackbar>
    </ToastContext.Provider>
  );
}
