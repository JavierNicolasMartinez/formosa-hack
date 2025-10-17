import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import { AuthService } from "../services/auth.services";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [authLoading, setAuthLoading] = useState(true);

  const handleError = (error) => {
    const err = error?.response?.data;
    if (Array.isArray(err)) setErrors(err);
    else setErrors([err?.message || "Error desconocido"]);
    console.error("Auth Error:", err);
  };

  const signin = useCallback(async (credentials) => {
    try {
      const { data } = await AuthService.login(credentials);
      setUser(data.data);
      setIsAuthenticated(true);
      setErrors([]);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, []);

  // 📝 SIGNUP: NO autentica (clave para que el modal no se cierre)
  const signup = useCallback(async (userData) => {
    try {
      const { data } = await AuthService.register(userData);
      // Intencionalmente NO seteamos user/isAuthenticated aquí
      setErrors([]);
      return Boolean(data?.ok ?? data?.data);
    } catch (error) {
      handleError(error);
      return false;
    }
  }, []);

  // 🚪 LOGOUT
  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const clearErrors = useCallback(() => setErrors([]), []);

  // 🔍 Verifica sesión al cargar
  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await AuthService.verifyToken();
        setUser(data.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };
    verify();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        errors,
        authLoading,
        signin,
        signup,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
