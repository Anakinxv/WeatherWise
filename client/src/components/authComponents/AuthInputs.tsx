import React from "react";
import { motion } from "framer-motion";
import { Input } from "../ui/input";

type AuthInPutsProps = {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  error?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

function AuthInPuts({
  type,
  placeholder,
  name,
  value,
  onChange,
  required = false,
  className,
  error,
  disabled = false,
  icon,
}: AuthInPutsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative ${className}`}
    >
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {icon}
          </div>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? "border-red-500" : ""
          } ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
          disabled={disabled}
        ></Input>{" "}
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
