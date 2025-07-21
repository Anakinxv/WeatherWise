import type { StateCreator } from "zustand";
import type {
  WeatherDataType,
  ForecastDataType,
  WeatherEvolutionType,
  CityLocationType,
} from "../types/climateTypes";
import {
  getWeather,
  getForecastWeather,
  getMaxTempFor24Hours,
  getWeatherforInput,
  getWeatherforSearch,
  getForecastforSearch,
  getWeatherEvolution,
} from "../services/ClimateService";

export type ClimateSliceType = {
  CountryWeather: string | null;
  weatherData: WeatherDataType | null;
  forecastData: ForecastDataType[] | null;
  weatherEvolution: WeatherEvolutionType[] | null;
  searchedCity: CityLocationType[] | null;
  isloading: boolean;
  error: string | null;
  fetchWeatherData: (city: string) => Promise<void>;
  fetchForecastData: (city: string) => Promise<void>;
  getMaxTempFor24Hours: (city: string) => Promise<void>;
  getWeatherforInputs: (city: string) => Promise<void>;
  getWeatherforSearch: (lat: number, lon: number) => Promise<void>;
  getForecastforSearch: (lat: number, lon: number) => Promise<void>;
  getWeatherEvolution: (lat: number, lon: number) => Promise<void>;
};

export const climateSlice: StateCreator<ClimateSliceType> = (set, get) => ({
  weatherData: null,
  isloading: false,
  error: null,
  forecastData: null,
  weatherEvolution: null,
  searchedCity: null,
  CountryWeather: null,

  fetchWeatherData: async (city: string) => {
    set({
      isloading: true,
      error: null,
    });
    try {
      const weatherData = await getWeather(city);
      console.log("Weather data fetched:", weatherData);

      set({
        weatherData: weatherData?.parsedWeatherData,
        isloading: false,
        error: null,
      });
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

  getMaxTempFor24Hours: async (city: string) => {
    set({
      isloading: true,
      error: null,
    });

    try {
      const maxTempData = await getMaxTempFor24Hours(city);
      set({
        weatherEvolution: maxTempData,
        isloading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching max temperature data:", error);
      set({
        isloading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching max temperature data",
      });
    }
  },

  getWeatherforInputs: async (city: string) => {
    if (!city || city.trim().length < 2) {
      return;
    }

    set({
      isloading: true,
      error: null,
    });

    try {
      const searchCity = await getWeatherforInput(city);

      const cities = Array.isArray(searchCity)
        ? searchCity.map((city: any) => ({
            name: city.name ?? "",
            country: city.country ?? "",
            countryFull: city.countryFull ?? "",
            state: city.state ?? null,
            lat: city.lat,
            lon: city.lon,
          }))
        : [];

      if (cities.length === 0) {
        set({
          searchedCity: [],
          isloading: false,
          error: null,
        });
        return;
      }

      const temps = await Promise.all(
        cities.map(async (city) => {
          try {
            const searchTerm = city.state || city.name;
            const weather = await getWeather(searchTerm);
            console.log("Weather data for city:", searchTerm, weather);

            return {
              ...city,
              temp: weather?.parsedWeatherData?.temp ?? null,
              currentWeather: weather?.parsedWeatherData?.currentWeather ?? "",
            };
          } catch (error) {
            console.warn(`Error fetching weather for ${city.name}:`, error);
            return {
              ...city,
              temp: null,
              currentWeather: "",
              error:
                error instanceof Error ? error.message : "Error desconocido",
            };
          }
        })
      );

      const weatherIcons = await Promise.all(
        cities.map(async (city) => {
          try {
            const searchTerm = city.state || city.name;
            const weather = await getForecastWeather(searchTerm);
            return weather?.[0]?.weatherIcon ?? "";
          } catch (error) {
            console.warn(`Error fetching forecast for ${city.name}:`, error);
            return "";
          }
        })
      );

      set({
        searchedCity: temps.map((city, index) => ({
          name: city.name,
          country: city.country,
          countryFull: city.countryFull,
          state: city.state,
          tempMax: city.temp !== null ? city.temp : undefined,
          TempMin: city.temp !== null ? String(city.temp) : undefined,
          date: new Date(),
          weatherCondition: city.currentWeather ?? "",
          weatherIcon: weatherIcons[index] ?? "",
          lat: city.lat,
          lon: city.lon,
        })),
        isloading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching weather for input:", error);
      set({
        isloading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching weather for input",
      });
    }
  },

  getWeatherforSearch: async (lat: number, lon: number) => {
    set({
      isloading: true,
      error: null,
    });

    try {
      const weatherData = await getWeatherforSearch(lat, lon);
      console.log("Weather data fetched by coordinates:", weatherData);

      set({
        weatherData: weatherData?.parsedWeatherData,
        isloading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching weather data by coordinates:", error);
      set({
        isloading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching weather data by coordinates",
      });
    }
  },

  getForecastforSearch: async (lat: number, lon: number) => {
    set({
      isloading: true,
      error: null,
    });

    try {
      const forecastData = await getForecastforSearch(lat, lon);
      console.log("Forecast data fetched by coordinates:", forecastData);

      set({
        forecastData: forecastData,
        isloading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching forecast data by coordinates:", error);
      set({
        isloading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching forecast data by coordinates",
      });
    }
  },

  getWeatherEvolution: async (lat: number, lon: number) => {
    set({
      isloading: true,
      error: null,
    });

    try {
      const evolutionData = await getWeatherEvolution(lat, lon);
      console.log(
        "Weather evolution data fetched by coordinates:",
        evolutionData
      );

      set({
        weatherEvolution: evolutionData,
        isloading: false,
        error: null,
      });
    } catch (error) {
      console.error(
        "Error fetching weather evolution data by coordinates:",
        error
      );
      set({
        isloading: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching weather evolution data by coordinates",
      });
    }
  },
});
