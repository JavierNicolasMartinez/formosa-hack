import axios from "axios";

const API_URL = "http://localhost:3312/api/auth";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Importante para que axios envíe cookies
});

export const registerRequest = (user) => apiClient.post(`/register`, user);

export const loginRequest = (user) => apiClient.post(`/login`, user);

export const verifyTokenRequest = () => apiClient.get("/verify");
