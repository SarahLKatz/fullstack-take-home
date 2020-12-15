import React from "react";
import { setLoggedInUser } from "../requests";
import fetch from "node-fetch";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const sendLogInRequest = async () => {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "post",
      body: { email, password },
    });
    const user = await response.json();
    return user;
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        name="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={sendLogInRequest}>
        Submit
      </button>
    </div>
  );
};

export default LoginForm;
