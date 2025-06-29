import type { StateCreator } from "zustand";
import { getCountries } from "../services/CountriesService";

// Tipo del slice de clima
export type ClimateSliceType = {
  countries: { country: string }[] | null;
  isLoading: boolean;
  error: string | null;
  getCountries: () => Promise<void>;
};

// Slice
export const climateSlice: StateCreator<ClimateSliceType> = (set, get) => ({
  countries: null,
  isLoading: false,
  error: null,

  getCountries: async () => {
    set({ isLoading: true, error: null });

    try {
      const countries = await getCountries();
      console.log("Countries fetched successfully:", countries);
      set({ countries, error: null });
    } catch (error: any) {
      console.error("Error fetching countries:", error);
      set({ error: error.message || "Error fetching countries" });
    } finally {
      set({ isLoading: false });
    }
  },
});
