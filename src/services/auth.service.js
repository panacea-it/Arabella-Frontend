import apiClient from "../api/apiClient";
import { API_ROUTES } from "../api/routes";

export const authService = {
  // --- EXISTING METHODS ---
  login: async (credentials) => {
    const response = await apiClient.post(API_ROUTES.AUTH.LOGIN, credentials);
    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },

  register: async (userData) => {
    return await apiClient.post(API_ROUTES.AUTH.REGISTER, userData);
  },

  verifyEmail: async (token) => {
    return await apiClient.post(API_ROUTES.AUTH.VERIFY_EMAIL, { token });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  // --- ✅ NEW METHODS ADDED ---
  forgotPassword: async (email) => {
    return await apiClient.post(API_ROUTES.AUTH.FORGOT_PASSWORD, { email });
  },

  resetPassword: async (token, newPassword) => {
    return await apiClient.post(API_ROUTES.AUTH.RESET_PASSWORD, {
      token,
      password: newPassword,
    });
  },
};
