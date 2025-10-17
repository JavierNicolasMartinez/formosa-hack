import { useState, useEffect, useCallback } from "react";
import AuthContext from "./AuthContext";
import { AuthService } from "../services/auth.services";

/**
 * AuthProvider
 * Maneja el contexto global de autenticación:
 * - Inicio / cierre de sesión
 * - Registro
 * - Verificación de token persistente
 * - Manejo de errores y estado de carga
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [authLoading, setAuthLoading] = useState(true); // Renombrado para claridad

  // --- LOGIN ---
  const signin = useCallback(async (credentials) => {
    try {
      const { data } = await AuthService.login(credentials);
      setUser(data.data);
      setIsAuthenticated(true);
      setErrors([]);
      return true; // ✅ éxito explícito
    } catch (error) {
      handleError(error);
      return false; // ❌ fallo explícito
    }
  }, []);

  // --- REGISTER ---
  const signup = useCallback(async (userData) => {
    try {
      const { data } = await AuthService.register(userData);
      setUser(data.data);
      setIsAuthenticated(true);
      setErrors([]);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }, []);

  // --- LOGOUT ---
  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // --- HANDLER DE ERRORES CENTRALIZADO ---
  const handleError = (error) => {
    const err = error?.response?.data;
    if (Array.isArray(err)) setErrors(err);
    else setErrors([err?.message || "Error desconocido"]);
    console.error("Auth Error:", err);
  };

  // --- VERIFICAR TOKEN AL CARGAR LA APP ---
  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await AuthService.verifyToken();
        setUser(data.data);
        setIsAuthenticated(true);
      } catch (error) {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    verifySession();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // --- LIMPIAR ERRORES MANUALMENTE (SI SE NECESITA) ---
  const clearErrors = useCallback(() => setErrors([]), []);

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
