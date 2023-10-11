import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import Wrapper from "../components/Wrapper";
import { getTokenFromLocalStorage, clearTokenFromLocalStorage } from "../api/token";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { getLoginUserInfo, addUser, removeUser } from "../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const user = useAppSelector((state) => state.userReducer.authorizedUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    clearTokenFromLocalStorage();
    dispatch(removeUser());
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <Wrapper width="25%">
      <Box>
        <img src={user.avatar} alt="User Profile" style={{ borderRadius: "30px", width: "100%" }} />
        <Box sx={{ display: "flex", flexDirection: "column", gap: "25px", marginTop: "50px" }}>
          <div>Email: {user.email}</div>
          <div>Role: {user.role}</div>
          <div>Password: {user.password}</div>
          <Button
            variant="contained"
            startIcon={<LogoutIcon />}
            color="error"
            onClick={handleLogout}
            sx={{ width: "50%", marginX: "auto" }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Profile;
