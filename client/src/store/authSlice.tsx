import type { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import type {
  userType,
  RegisterAPIType,
  CodeVerificationType,
  ChangePasswordType,
} from "../types/authTypes";
import {
  singupService,
  loginService,
  forgotPasswordService,
  resetPasswordService,
} from "../services/AuthService";

// Constante para la expiración (1 hora en milisegundos)
const ONE_HOUR_MS = 60 * 60 * 1000;

// Función auxiliar para guardar en localStorage con tiempo de expiración
const setWithExpiry = (key: string, value: string) => {
  const item = {
    value: value,
    expiry: new Date().getTime() + ONE_HOUR_MS,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Función auxiliar para obtener del localStorage verificando expiración
const getWithExpiry = (key: string) => {
  const itemStr = localStorage.getItem(key);

  // Si no existe el item, retornar null
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();

    // Comparar la fecha actual con la fecha de expiración
    if (now > item.expiry) {
      // Si ha expirado, eliminar el item
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    // Si hay un error al parsear, eliminar el item
    localStorage.removeItem(key);
    return null;
  }
};

export type AuthSliceType = {
  user: userType | null;
  isAuthenticated: boolean;
  error: string | null;
  isloading: boolean;
  resetEmail: string | null;
  resetCode: string | null;
  signup: (data: RegisterAPIType) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (data: CodeVerificationType) => Promise<boolean>;
  changePassword: (data: ChangePasswordType) => Promise<boolean>;
};

export const createAuthSlice: StateCreator<AuthSliceType> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isloading: false,
  resetEmail: getWithExpiry("resetEmail"),
  resetCode: getWithExpiry("resetCode"),

  signup: async (data: RegisterAPIType) => {
    set({
      isloading: true,
      error: null,
    });

    try {
      if (!data.name || !data.email || !data.password) {
        throw new Error("All fields are required");
      }

      const response = await singupService(data);

      console.log("Response from signup:", response);

      set({
        user: response.user,
        isAuthenticated: true,
        isloading: false,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        isloading: false,
      });
    }
  },

  login: async (email: string, password: string) => {
    set({ isloading: true, error: null });

    try {
      const response = await loginService({ email, password });

      console.log("Response from login:", response);
      set({
        user: response.user,
        isAuthenticated: true,
        isloading: false,
      });
    } catch (error) {
      console.error("Error during login:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        isloading: false,
      });
    }
  },

  logout: () => {},

  forgotPassword: async (email: string): Promise<boolean> => {
    set({
      isloading: true,
      error: null,
      resetEmail: email,
    });

    try {
      await forgotPasswordService(email);

      // Guardar email con expiración de 1 hora
      setWithExpiry("resetEmail", email);

      set({
        isloading: false,
      });
      return true;
    } catch (error) {
      console.error("Error during forgotPassword:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo enviar el correo de recuperación",
        isloading: false,
      });
      return false;
    }
  },

  resetPassword: async (data: CodeVerificationType): Promise<boolean> => {
    set({
      isloading: true,
      error: null,
    });

    try {
      const response = await resetPasswordService(data);

      console.log("Response from resetPassword:", response);

      // Guardar código con expiración de 1 hora
      setWithExpiry("resetCode", data.code);

      set({
        error: null,
        isloading: false,
        resetCode: data.code,
      });

      return true;
    } catch (error) {
      console.error("Error during resetPassword:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo restablecer la contraseña",
        isloading: false,
      });
      return false;
    }
  },

  changePassword: async (data: ChangePasswordType): Promise<boolean> => {
    set({
      isloading: true,
      error: null,
    });

    try {
      const response = await resetPasswordService(data);
      console.log("Response from changePassword:", response);

      set({
        error: null,
        isloading: false,
      });

      // Limpiar valores de localStorage
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetCode");

      return true;
    } catch (error) {
      console.error("Error during changePassword:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "No se pudo cambiar la contraseña",
        isloading: false,
      });
      return false;
    }
  },
});
