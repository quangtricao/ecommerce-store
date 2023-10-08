import { useEffect } from "react";
import { getTokenFromLocalStorage } from "../api/token";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getLoginUserInfo, addUser } from "../redux/reducers/userReducer";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer.authorizedUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token) {
      dispatch(getLoginUserInfo(token))
        .unwrap()
        .then((response) => {
          if (typeof response === "object") {
            dispatch(addUser(response));
          }
        });
    }
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <div>{user.avatar}</div>
      <div>{user.email}</div>
      <div>{user.role}</div>
      <div>{user.password}</div>
    </div>
  );
};

export default Profile;
