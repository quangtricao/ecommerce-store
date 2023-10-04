import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

type ProtectedRouteProp = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  const user = useAppSelector((state) => state.userReducer);

  if (!user.authorizedUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default ProtectedRoute;
