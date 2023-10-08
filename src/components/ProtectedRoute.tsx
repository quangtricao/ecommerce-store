import { Navigate } from "react-router-dom";
import { getTokenFromLocalStorage } from "../api/token";

type ProtectedRouteProp = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  const access_token = getTokenFromLocalStorage();

  if (!access_token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
