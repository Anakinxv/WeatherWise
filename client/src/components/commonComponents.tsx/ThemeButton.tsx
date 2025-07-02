import { Sun, Moon } from "@geist-ui/icons";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "../ui/button";

function ThemeButton() {
  const { theme, setTheme, actualTheme } = useTheme();

  const handleToggle = () => {
    // Si está en system, cambiar a light/dark según el tema actual
    if (theme === "system") {
      setTheme(actualTheme === "dark" ? "light" : "dark");
    } else {
      // Si está en light/dark, alternar
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-10 h-10 p-2 rounded-full flex items-center justify-center transition-all duration-300 group"
      onClick={handleToggle}
      aria-label="Toggle theme"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        borderColor: "var(--sidebar-secondary)",
        border: "1px solid var(--sidebar-secondary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--sidebar-bg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--sidebar-bg)";
      }}
    >
      <div className="relative w-5 h-5">
        {/* Icono de Sol (modo claro) */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{
            scale: actualTheme === "light" ? 1 : 0,
            rotate: actualTheme === "light" ? 0 : -180,
            opacity: actualTheme === "light" ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            type: "spring",
            stiffness: 200,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5" style={{ color: "var(--sidebar-text)" }} />
        </motion.div>

        {/* Icono de Luna (modo oscuro) */}
        <motion.div
          initial={{ scale: 0, rotate: 180, opacity: 0 }}
          animate={{
            scale: actualTheme === "dark" ? 1 : 0,
            rotate: actualTheme === "dark" ? 0 : 180,
            opacity: actualTheme === "dark" ? 1 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
            type: "spring",
            stiffness: 200,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5" style={{ color: "var(--sidebar-text)" }} />
        </motion.div>
      </div>

      <div
        className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ backgroundColor: "var(--sidebar-text)" }}
      />
    </Button>
  );
}

export default ThemeButton;
