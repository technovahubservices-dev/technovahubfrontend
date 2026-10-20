import apiClient from "./apiClient";
import { API_BASE_URL } from "../data/constants";

let warmupRequest;
let lastWarmupAt = 0;

// Open the backend connection while credentials are being entered, without
// blocking submission or sending credentials. Deduplicate React StrictMode mounts.
export const warmAdminApi = () => {
  const now = Date.now();
  if (!warmupRequest || now - lastWarmupAt > 60_000) {
    lastWarmupAt = now;
    warmupRequest = fetch(`${API_BASE_URL.replace(/\/$/, "")}/`, {
      credentials: "omit",
      cache: "no-store",
      signal: AbortSignal.timeout(45_000),
    }).catch(() => undefined);
  }
  return warmupRequest;
};

// Admin login
export const loginAdmin = async (userName, password) => {
  try {
    const response = await apiClient.post("/auth/login", { userName, password });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};

// Admin register
export const registerAdmin = async (userName, password) => {
  try {
    const response = await apiClient.post("/auth/register", { userName, password });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Registration failed" };
  }
};

// Admin logout
export const logoutAdmin = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Logout failed" };
  }
};
