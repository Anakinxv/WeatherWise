import { create } from "zustand";
import { createAuthSlice } from "./authSlice";
import type { AuthSliceType } from "./authSlice";
import type { CountrySliceType } from "./countrySlice";
import { countrySlice } from "./countrySlice";
import type { ClimateSliceType } from "./climateSlice";
import { climateSlice } from "./climateSlice";
import type { SettingsSliceType } from "./settingsSlice.tsx";
import { settingsSlice } from "./settingsSlice.tsx";

export const useAppStore = create<
  AuthSliceType & CountrySliceType & ClimateSliceType & SettingsSliceType
>((...a) => ({
  ...createAuthSlice(...a),
  ...countrySlice(...a),
  ...climateSlice(...a),
  ...settingsSlice(...a),
}));
