import type { StateCreator } from "zustand";
import type {
  ProfileFormValues,
  PreferencesFormValues,
  ChangePasswordFormValues,
} from "@/types/settingsTypes";

import { changePersonalInfo } from "@/services/UserService";

export type SettingsSliceType = {
  profile: any | null;
  preferences: PreferencesFormValues | null;
  changePasswordData: ChangePasswordFormValues | null;

  isloading: boolean;
  error: string | null;

  updateProfile: (data: ProfileFormValues) => Promise<void>;
  updatePreferences: (data: PreferencesFormValues) => Promise<void>;
  updatePassword: (data: ChangePasswordFormValues) => Promise<void>;
};

export const settingsSlice: StateCreator<SettingsSliceType> = (set, get) => ({
  profile: null,
  preferences: null,
  changePasswordData: null,

  isloading: false,
  error: null,

  updateProfile: async (data: ProfileFormValues) => {
    set({ isloading: true, error: null });

    try {
      const response = await changePersonalInfo(data);
      set({
        profile: response.user,
        isloading: false,
        error: null,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        isloading: false,
      });
    }
  },

  updatePreferences: async (data: PreferencesFormValues) => {
    // Implement preferences update logic here
  },

  updatePassword: async (data: ChangePasswordFormValues) => {
    // Implement change password logic here
  },
});
