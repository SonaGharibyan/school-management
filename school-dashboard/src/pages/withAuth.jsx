import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <WrappedComponent />;
};

export { withAuth };
