import { useState } from "react";

import { login } from "../api/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login({ email, password });
  };

  return (
    <div>
      <form action="">
        <div>
          Username:
          <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div>
          Password:
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
