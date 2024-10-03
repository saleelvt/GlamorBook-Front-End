import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./reduxKit/store";

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { role, isLogged } = useSelector((state: RootState) => state.auth);

  if (!isLogged) {
    // User is not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(role!)) {
    // User does not have the required role, redirect to appropriate homepage
    switch (role!) {
      case 'user':
        return <Navigate to="/userHomepage" />;
      case 'salon':
        return <Navigate to="/salonHome" />;
      case 'admin':
        return <Navigate to="/adminHomepage" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default PrivateRoute;
