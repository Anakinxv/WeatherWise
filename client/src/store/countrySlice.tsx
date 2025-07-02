import type { StateCreator } from "zustand";
import { getCountries, getCitiesByCountry } from "../services/CountriesService";
import type { CountryType, StateType } from "../utils/schemas/geo-schema";

type levels = "country" | "state";

export type CountrySliceType = {
  countries: CountryType[];
  states: StateType[];

  isloading: boolean; // Add this line to match authSlice
  error: string | null;
  openModal: boolean;
  selectedCountry: string;
  selectedState: string;
  currentLevel: levels;
  setCurrentLevel: (level: levels) => void;
  setSelectedCountry: (country: string) => void;
  setSelectedState: (state: string) => void;
  setOpenModal: (open: boolean) => void;
  getCountries: () => Promise<void>;
  getStatesByCountry: (countryName: string) => Promise<void>;
};

// Slice
export const countrySlice: StateCreator<CountrySliceType> = (set, get) => ({
  countries: [],
  states: [],
  isloading: false, // Use lowercase to match authSlice
  error: null,
  openModal: false,
  selectedCountry: "",
  selectedState: "",
  currentLevel: "country",

  setCurrentLevel: (level: levels) => {
    set({ currentLevel: level });
  },

  setSelectedCountry: (country: string) => {
    set({
      selectedCountry: country,
      states: [], // Limpiar estados anteriores
      selectedState: "", // Limpiar selección anterior
    });
  },

  setSelectedState: (state: string) => {
    set({ selectedState: state });
  },

  setOpenModal: (open: boolean) => {
    set({ openModal: open });
  },

  getCountries: async () => {
    // Update loading state
    set({ isloading: true, error: null });

    try {
      const countries = await getCountries();
      set({ countries, error: null, isloading: false }); // Remove the extra comma
    } catch (error: any) {
      set({
        error: error.message || "Error fetching countries",
        isloading: false,
      });
    }
  },

  getStatesByCountry: async (countryName: string) => {
    set({ isloading: true, error: null });

    try {
      const response = await getCitiesByCountry(countryName);
      console.log("States fetched successfully:", response);

      if (!response) {
        throw new Error("Invalid response structure from states API");
      }

      set({ states: response, error: null, isloading: false });
    } catch (error: any) {
      console.error("Error fetching states:", error);
      set({
        error: error.message || "Error fetching states",
        isloading: false,
      });
    }
  },
});
