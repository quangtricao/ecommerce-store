import { Navigate } from "react-router-dom";

import { getTokenFromLocalStorage, getLoginUserInfo } from "../api/user";

type ProtectedRouteProp = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProp) => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return <Navigate to="/login" />;
  }
  getLoginUserInfo(token).then((res) => console.log(res));

  return children;
};

export default ProtectedRoute;
