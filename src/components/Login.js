import React from "react";
import { LoginForm } from "./LoginForm";

export const Login = ({ setUser }) => {
  return (
    <div>
      <LoginForm setUser={setUser} />
    </div>
  );
};
