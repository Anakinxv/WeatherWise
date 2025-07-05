import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type InputsDashProps = {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

function InputsDash({
  placeholder,
  type,
  value,
  onChange,
  icon,
  children,
  className,
}: InputsDashProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full relative"
    >
      <div className="relative">
        {/* Icono izquierdo opcional */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--sidebar-secondary)] icon">
            {icon}
          </div>
        )}

        <Input
          placeholder={placeholder}
          type={inputType}
          value={value}
          onChange={onChange}
          className={`dashboard-input ${icon ? "pl-10" : ""} ${
            type === "password" ? "pr-12" : ""
          } text-[var(--sidebar-text)] border-[var(--borderbg)] ${
            className ? className : ""
          }`}
        />

        {/* Botón de toggle para contraseña */}
        {type === "password" && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleTogglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-[var(--sidebar-hover-bg)]"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-[var(--sidebar-secondary)]" />
            ) : (
              <Eye className="h-4 w-4 text-[var(--sidebar-secondary)]" />
            )}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

export default InputsDash;
