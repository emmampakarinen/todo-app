import { createContext } from "react";

export type ToastColor = "success" | "danger" | "neutral";

export type ToastContextValue = {
  showToast: (message: string, color?: ToastColor) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(
  undefined
);
