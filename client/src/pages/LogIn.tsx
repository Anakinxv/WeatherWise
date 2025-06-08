import React from "react";
import AuthCard from "../components/authComponents/AuthCard";
import { Mail } from "@geist-ui/icons";
import AuthInPuts from "../components/authComponents/AuthInPuts";
import Logo from "../assets/Lgo.png";
function LogIn() {
  return (
    <AuthCard>
      <div className="flex justify-center items-center mb-4">
        <img src={Logo} className="h-34 w-42 "></img>
      </div>

      <AuthInPuts
        type="email"
        placeholder="Email"
        name="email"
        required
        className="mb-4"
        icon={<Mail />}
      ></AuthInPuts>
    </AuthCard>
  );
}

export default LogIn;
