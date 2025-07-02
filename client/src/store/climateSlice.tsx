import type { StateCreator } from "zustand";
import type { WeatherDataType, ForecastDataType } from "../types/climateTypes";
import { getWeather, getForecastWeather } from "../services/ClimateService";
import { persist, createJSONStorage } from "zustand/middleware";

export type ClimateSliceType = {
  weatherData: WeatherDataType | null;
  forecastData: ForecastDataType[] | null;
  isloading: boolean;
  error: string | null;
  fetchWeatherData: (city: string) => Promise<void>;
  fetchForecastData: (city: string) => Promise<void>;
};

export const climateSlice: StateCreator<ClimateSliceType> = (set, get) => ({
  weatherData: null,
  isloading: false,
  error: null,
  forecastData: null,

  fetchWeatherData: async (city: string) => {
    set({
      isloading: true,
      error: null,
    });
    try {
      const weatherData = await getWeather(city);
      set({
        weatherData: weatherData?.parsedWeatherData,
        isloading: false,
        error: null,
      });
      console.log("Weather data fetched successfully:", weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      set({
        isloading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching weather data",
      });
    }
  },

  fetchForecastData: async (city: string) => {
    set({
      isloading: true,
      error: null,
    });

    try {
      const responseForecast = await getForecastWeather(city);
      set({
        forecastData: responseForecast,
        isloading: false,
        error: null,
      });
      console.log("Forecast data fetched successfully:", responseForecast);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      set({
        isloading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching forecast data",
      });
    }
  },
});
