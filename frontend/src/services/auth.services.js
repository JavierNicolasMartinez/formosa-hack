import axios from "axios";

const API_URL = "http://localhost:3312/api/auth";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // envía cookies automáticamente
});

export const AuthService = {
  register: (user) => apiClient.post("/register", user),
  login: (user) => apiClient.post("/login", user),
  verifyToken: () => apiClient.get("/verify"),
  logout: () => apiClient.post("/logout"),
};
