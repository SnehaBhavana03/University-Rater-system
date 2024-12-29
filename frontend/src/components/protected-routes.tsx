import { Navigate, Outlet } from "react-router-dom";
import { getAuthenticatedUser } from "../lib/utils";

const ProtectedRoutes = () => {
  const isAuthenticated = getAuthenticatedUser();

  if (isAuthenticated) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
