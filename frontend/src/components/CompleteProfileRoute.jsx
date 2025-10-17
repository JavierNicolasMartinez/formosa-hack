import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function CompleteProfileRoute() {
  const { isAuthenticated, loading, user, forceCompleteProfile } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user already completed profile, redirect to dashboard
  if (!forceCompleteProfile) {
    // redirect according to role
    if (user?.role === "tutor")
      return <Navigate to="/tutor-dashboard" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
