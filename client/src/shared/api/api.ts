import axios from "axios";
import { clearAuth, getToken } from "../lib/token";

// Create an axios instance with default settings
export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: false,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// Before every API request, add the auth token to the headers if it exists
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    // add token to headers
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // continue with the request
});

// Check for 401 in responses and handle them by redirecting to login
api.interceptors.response.use(
  (response) => response, // pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      // handle unauthorized access
      console.warn("Unauthorized! Redirecting to login...");
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
