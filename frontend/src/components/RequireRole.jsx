// src/components/RequireRole.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireRole({
  roles = [],
  children,
  redirectIfNoAuth = "/",
  redirectIfNoRole = "/dashboard",
}) {
  const { isAuthenticated, authLoading, user } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-slate-700" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={redirectIfNoAuth} replace state={{ from: location }} />
    );
  }

  if (roles.length && !roles.includes(user?.role)) {
    return <Navigate to={redirectIfNoRole} replace />;
  }

  return children;
}
