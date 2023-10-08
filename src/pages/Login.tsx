import { useState } from "react";
import { useAppDispatch } from "../redux/hook";

import SignInForm from "../components/SignInForm";
import SignUpFom from "../components/SignUpForm";
import { login, register } from "../redux/reducers/userReducer";
import { saveTokenToLocalStorage } from "../api/token";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);

  const handleSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      login({
        email: String(data.get("email")),
        password: String(data.get("password")),
      })
    )
      .unwrap()
      .then((response) => {
        if (typeof response === "object") {
          saveTokenToLocalStorage(response.access_token);
          navigate("/profile");
        } else {
          console.log(response);
        }
      });
  };

  const handleSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { payload } = await dispatch(
      register({
        name: String(data.get("fullName")),
        email: String(data.get("email")),
        password: String(data.get("password")),
        avatar: String(data.get("avatar")),
      })
    );

    if (typeof payload === "object") {
      setSignIn(true);
    } else {
      console.log(payload);
    }
  };

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
