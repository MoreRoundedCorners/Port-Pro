import React from "react";
import { SignUpForm } from "./SignUpForm";

export const SignUp = ({ setUser }) => {
  return (
    <div className="h-screen">
      <SignUpForm setUser={setUser} />
    </div>
  );
};
