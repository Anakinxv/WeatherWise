import type { StateCreator } from "zustand";
import type { userType, RegisterAPIType } from "../types/authTypes";
import { singupService } from "../services/AuthService";
export type AuthSliceType = {
  user: userType | null;
  isAuthenticated: boolean;
  error: string | null;
  isloading: boolean;
  signup: (data: RegisterAPIType) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<void>;
  updateUser: (data: Partial<userType>) => Promise<void>;
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

  login: async (email: string, password: string) => {},

  logout: () => {},

  forgotPassword: async (email: string) => {},

  resetPassword: async (code: string, newPassword: string) => {},

  updateUser: async (data: Partial<userType>) => {},
});
