import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "@geist-ui/icons";

type AuthInPutsProps = {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
};

function AuthInPuts({
  type,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  error,
  disabled = false,
  ...props
}: AuthInPutsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Determine the input type - if it's password and showPassword is true, use text
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="relative">
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer transition-colors duration-200 hover:text-primary"
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        )}

        <Input
          type={inputType}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="w-full rounded-3xl px-4 py-2 border-[1px] auth-input"
          style={{
            height: "auto",
            minHeight: "44px",
          }}
          {...props}
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-1 ml-1"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

export default AuthInPuts;
