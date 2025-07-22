import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { User } from "@geist-ui/icons";
import { X } from "@geist-ui/icons";

function ViewProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex w-full justify-start items-center gap-2 px-2 py-1.5 text-sm font-normal text-[var(--sidebar-secondary)] hover:bg-[var(--sidebar-hover-bg)] rounded-md">
          <User className="size-4" />
          Ver Perfil
        </button>
      </DialogTrigger>

      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent rounded-lg shadow-2xl z-50 w-full max-w-md border-0 p-0 [&>button]:hidden">
        <VisuallyHidden>
          <DialogTitle>Perfil de Usuario</DialogTitle>
          <DialogDescription>
            Información del perfil del usuario actual
          </DialogDescription>
        </VisuallyHidden>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.2,
          }}
          className="bg-[var(--sidebar-bg)] rounded-lg shadow-2xl w-full p-6 border border-[var(--sidebar-border)]"
        >
          {/* Header del modal */}
          <div className="flex justify-end items-center mb-6">
            <DialogClose asChild>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-md text-[var(--sidebar-secondary)] hover:text-[var(--sidebar-text)] transition-colors"
              >
                <X className="size-6" />
              </motion.button>
            </DialogClose>
          </div>

          {/* Contenido del perfil */}
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar grande centrado */}
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-[var(--sidebar-border)] shadow-lg">
                <AvatarImage
                  src="/placeholder-avatar.png"
                  alt="User Avatar"
                  className="object-cover"
                />
                <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                  U
                </AvatarFallback>
              </Avatar>
              {/* Indicador de estado online */}
              <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-[var(--sidebar-bg)] rounded-full"></div>
            </div>

            {/* Información del usuario */}
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-[var(--sidebar-text)]">
                Nombre del Usuario
              </h3>
              <p className="text-sm text-[var(--sidebar-secondary)]">
                correo@ejemplo.com
              </p>
              <p className="text-xs text-[var(--sidebar-secondary)]">
                Miembro desde: Enero 2024
              </p>
            </div>

            {/* Estadísticas del usuario */}
            <div className="w-full bg-[var(--sidebar-nav-bg)] rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-[var(--sidebar-secondary)]">
                  Búsquedas realizadas:
                </span>
                <span className="text-sm font-medium text-[var(--sidebar-text)]">
                  247
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[var(--sidebar-secondary)]">
                  Ciudades favoritas:
                </span>
                <span className="text-sm font-medium text-[var(--sidebar-text)]">
                  5
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewProfile;
