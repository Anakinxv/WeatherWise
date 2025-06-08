import React from "react";
import { Outlet } from "react-router-dom";
import Darkbg from "../assets/DarkBg.png";
import LightBg from "../assets/LightBg.png";
import ThemeButton from "@/components/commonComponents.tsx/ThemeButton.tsx";
import { useTheme } from "@/context/ThemeContext.tsx";

function AuthLayout() {
  const { actualTheme } = useTheme();

  return (
    <main className="container mx-auto flex h-screen w-full max-w-2xl items-center justify-center px-4">
      <div className="absolute top-4 right-4 z-20">
        <ThemeButton />
      </div>
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={actualTheme === "dark" ? Darkbg : LightBg}
        alt="Background"
      />
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
}

export default AuthLayout;
