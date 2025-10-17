import axios from "axios";

const API_URL = "http://localhost:3312/api/auth";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const AuthService = {
  register: (data) => api.post("/register", data), // <<-- data incluye role
  login: (data) => api.post("/login", data),
  verifyToken: () => api.get("/verify"),
  logout: () => api.post("/logout"),
};
