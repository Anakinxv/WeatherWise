import React from "react";
import { Button } from "../ui/button";

type AuthButtonsProps = {
  type?: "submit" | "button";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

function AuthButtons({ type, onClick, disabled, children }: AuthButtonsProps) {
  return (
    <Button
      variant="secondary"
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full  h-13 rounded-3xl text-xl font-semibold shadow-md transition-colors duration-300 hover:bg-accent hover:text-background focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        backgroundColor: "hsl(var(--foreground)",
        color: "hsl(var(--background))",
      }}
    >
      {children}
    </Button>
  );
}

export default AuthButtons;
