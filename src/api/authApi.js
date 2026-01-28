import apiClient from "./apiClient";

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
