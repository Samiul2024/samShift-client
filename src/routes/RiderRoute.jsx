import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (loading || isLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user || role !== "rider") {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default RiderRoute;