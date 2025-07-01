import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import type { AuthSliceType } from "./authSlice";
import type { ClimateSliceType } from "./climateSlice";
import { climateSlice } from "./climateSlice";

export const useAppStore = create<AuthSliceType & ClimateSliceType>((...a) => ({
  ...createAuthSlice(...a),
  ...climateSlice(...a),
}));
