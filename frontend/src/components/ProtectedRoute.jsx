import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, loading, user, forceCompleteProfile } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    // If not authenticated send to homepage where modal can be opened
    return <Navigate to="/" replace />;
  }

  // If logged in but profile is incomplete, force to complete-profile
  if (forceCompleteProfile) {
    return <Navigate to="/complete-profile" replace />;
  }

  // Role guard
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // unauthorized: you could send to a 403 page or homepage
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // render nested routes
}
