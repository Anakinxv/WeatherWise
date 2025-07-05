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
    set({
      isloading: true,
      error: null,
    });

    try {
      const searchCity = await getWeatherforInput(city);

      // Transforma searchCity al esquema esperado
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

      const temps = await Promise.all(
        cities.map(async (city) => {
          try {
            const weather = await getWeather(city.name);
            console.log("Weather data for city:", city.name, weather);

            return {
              ...city,
              temp: weather?.parsedWeatherData?.temp ?? null,
              currentWeather: weather?.parsedWeatherData?.currentWeather ?? "",
            };
          } catch (error) {
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
            const weather = await getForecastWeather(city.name);
            // getForecastWeather retorna un array, tomar el primer elemento
            return weather?.[0]?.weatherIcon ?? "";
          } catch (error) {
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
});
