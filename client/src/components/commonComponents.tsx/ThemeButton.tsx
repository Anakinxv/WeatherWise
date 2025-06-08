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
      className="w-10 h-10 p-2 rounded-full flex items-center justify-center hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 border border-gray-300/50 dark:border-gray-600/50"
      onClick={handleToggle}
      aria-label="Toggle theme"
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
          <Sun className="w-5 h-5 text-yellow-500" />
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
          <Moon className="w-5 h-5 text-blue-400" />
        </motion.div>
      </div>

      {/* Indicador opcional del estado actual */}
      <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </Button>
  );
}

export default ThemeButton;
