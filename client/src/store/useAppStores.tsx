import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import type { AuthSliceType } from "./authSlice";
import type { CountrySliceType } from "./countrySlice";
import { countrySlice } from "./countrySlice";
import type { ClimateSliceType } from "./climateSlice";
import { climateSlice } from "./climateSlice";

export const useAppStore = create<
  AuthSliceType & CountrySliceType & ClimateSliceType
>((...a) => ({
  ...createAuthSlice(...a),
  ...countrySlice(...a),
  ...climateSlice(...a),
}));
