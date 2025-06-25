import type { StateCreator } from "zustand";
import type { userType, RegisterAPIType } from "../types/authTypes";
import {
  singupService,
  loginService,
  forgotPasswordService,
} from "../services/AuthService";
export type AuthSliceType = {
  user: userType | null;
  isAuthenticated: boolean;
  error: string | null;
  isloading: boolean;
  signup: (data: RegisterAPIType) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (code: string, newPassword: string) => Promise<void>;
};

export const createAuthSlice: StateCreator<AuthSliceType> = (set, get) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isloading: false,

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
    });

    try {
      await forgotPasswordService(email);

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

  resetPassword: async (code: string, newPassword: string) => {},
});
