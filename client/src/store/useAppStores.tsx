import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import type { AuthSliceType } from "./authSlice";

export const useAuthStore = create<AuthSliceType>((...a) => ({
  ...createAuthSlice(...a),
}));
