import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignInForm from "../components/SignInForm";
import SignUpFom from "../components/SignUpForm";
import { login, getLoginUserInfo, signup } from "../api/user";
import { saveTokenToLocalStorage, getTokenFromLocalStorage } from "../api/token";
import { addUser } from "../redux/slices/userReducer";
import { useAppDispatch } from "../redux/hook";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState(true);
  const token = getTokenFromLocalStorage();

  // Verify the token. If true, the server return the user object
  useEffect(() => {
    if (typeof token === "string") {
      getLoginUserInfo(token).then((response) => {
        if (typeof response === "object") {
          navigate("/");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await login({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });

    if (typeof response === "object") {
      const authorizedUser = await getLoginUserInfo(response.access_token);
      if (typeof authorizedUser === "object") {
        dispatch(addUser(authorizedUser));
        saveTokenToLocalStorage(response.access_token);
        navigate("/");
      }
    } else {
      // Error handling
      console.log(response);
    }
  };

  const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await signup({
      name: String(data.get("fullName")),
      email: String(data.get("email")),
      password: String(data.get("password")),
      avatar: String(data.get("avatar")),
    });

    if (typeof response === "object") {
      // Dispatch successful noti
      setSignIn(true);
    } else {
      // Error handling
      console.log(response);
    }
  };

  if (token) {
    return null;
  }

  return (
    <>
      {signIn ? (
        <SignInForm handleSubmit={handleSubmitLogin} setSignIn={setSignIn} />
      ) : (
        <SignUpFom handleSubmit={handleSubmitRegister} setSignIn={setSignIn} />
      )}
    </>
  );
};

export default Login;
