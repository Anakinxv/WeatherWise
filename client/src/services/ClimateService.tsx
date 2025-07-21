import axios from "axios";
import {
  weatherDataSchema,
  forecastDataSchema,
  cityLocationSchema,
  weatherEvolutionSchema,
} from "../utils/schemas/climate-schema";
import countries from "i18n-iso-countries";
import es from "i18n-iso-countries/langs/es.json";

countries.registerLocale(es);
const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

if (!apiKey) {
  console.error("OpenWeather API key is missing. Please check your .env file");
}

export const getWeather = async (city: string = "Santo Domingo") => {
  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured in .env file");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.data || !response.data.main || !response.data.weather) {
      throw new Error("Invalid response structure from weather API");
    }

    const weatherData = {
      humidity: response.data.main.humidity, // Humedad en %
      wind: response.data.wind.speed, // Velocidad del viento en m/s
      feelsLike: response.data.main.feels_like, // Sensación térmica en °C
      precipitation: response.data.rain ? response.data.rain["1h"] || 0 : 0, // Precipitación en mm, 0 si no hay datos
      currentWeather: response.data.weather[0].description, // Descripción del clima actual
      weatherId: response.data.weather[0].id, // ID del clima
      temp: response.data.main.temp, // Temperatura actual en °C
    };

    const parsedWeatherData = weatherDataSchema.safeParse(weatherData);

    if (!parsedWeatherData.success) {
      console.warn("Invalids weather data:", parsedWeatherData.error);
      throw new Error("Weather data validation failed");
    }
    return {
      parsedWeatherData: parsedWeatherData.data,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      throw new Error(
        error.response?.data?.message ||
          "Error fetching weather data from OpenWeather"
      );
    }
  }
};

export const getForecastWeather = async (city: string = "Santo Domingo") => {
  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured in .env file");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`
    );

    const forecastList = response.data.list;

    const dailyData: Record<
      string,
      {
        temps: number[];
        conditions: Record<string, number>;
        icons: Record<string, number>;
      }
    > = {};

    forecastList.forEach((item: any) => {
      const date = item.dt_txt.split(" ")[0]; // Solo la fecha sin hora

      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          conditions: {},
          icons: {},
        };
      }

      // Guardar temperaturas
      dailyData[date].temps.push(item.main.temp);

      // Contar condiciones (Clear, Rain, Clouds...)
      const condition = item.weather[0].main;
      dailyData[date].conditions[condition] =
        (dailyData[date].conditions[condition] || 0) + 1;

      // Contar iconos para elegir el más común
      const icon = item.weather[0].icon;
      dailyData[date].icons[icon] = (dailyData[date].icons[icon] || 0) + 1;
    });

    // Convertir objeto a array y procesar máximos, mínimos y condiciones
    const result = Object.keys(dailyData)
      .slice(0, 5)
      .map((date) => {
        const temps = dailyData[date].temps;
        const max = Math.max(...temps);
        const min = Math.min(...temps);

        const conditions = dailyData[date].conditions;
        const mostCommonCondition = Object.keys(conditions).reduce((a, b) =>
          conditions[a] > conditions[b] ? a : b
        );

        const icons = dailyData[date].icons;
        const mostCommonIcon = Object.keys(icons).reduce((a, b) =>
          icons[a] > icons[b] ? a : b
        );

        // Corrigiendo formato según el esquema esperado
        const weatherForecast = {
          date: new Date(date), // Convertir a objeto Date
          tempMax: Math.round(max), // Solo el número sin unidades
          tempMin: Math.round(min), // Solo el número sin unidades
          weatherCondition: mostCommonCondition, // Nombre correcto según schema
          weatherIcon: `https://openweathermap.org/img/wn/${mostCommonIcon}@2x.png`, // Nombre correcto según schema
        };

        const parsedForecastData =
          forecastDataSchema.safeParse(weatherForecast);

        if (!parsedForecastData.success) {
          console.warn("Invalid forecast data:", parsedForecastData.error);
          throw new Error("Forecast data validation failed");
        }
        return parsedForecastData.data;
      });

    return result;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching forecast data from OpenWeather"
      );
    }
    throw error;
  }
};

export const getMaxTempFor24Hours = async (city: string) => {
  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured in .env file");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`
    );

    const forecastList = response.data.list;
    console.log("Forecast data for 24 hours:", forecastList);

    const weatherEvolution = forecastList.map((item: any) => {
      const evolutionData = {
        time: item.dt_txt,
        temp: Math.round(item.main.temp),
        tempMax: Math.round(item.main.temp_max),
        tempMin: Math.round(item.main.temp_min),
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        precipitation: item.rain ? item.rain["3h"] || 0 : 0,
        weatherCondition: item.weather[0].main,
        weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      };

      const parsedEvolutionData =
        weatherEvolutionSchema.safeParse(evolutionData);

      if (!parsedEvolutionData.success) {
        console.warn(
          "Invalid weather evolution data:",
          parsedEvolutionData.error
        );
        throw new Error("Weather evolution data validation failed");
      }

      return parsedEvolutionData.data;
    });

    return weatherEvolution;
  } catch (error) {
    console.error("Error fetching max temperature data:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching max temperature data from OpenWeather"
      );
    }
    throw error;
  }
};

export const getWeatherforInput = async (query: string) => {
  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured in .env file");
  }

  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        query
      )}&limit=20&appid=${apiKey}`
    );

    if (!response.data || !Array.isArray(response.data)) {
      return [];
    }

    console.log("Response data for input query:", response.data);

    const results = response.data.map((city: any) => ({
      cityId: city.id || null,
      name: city.name || "",
      state: city.state || null,
      country: city.country || "",
      countryFull:
        countries.getName(city.country, "es", { select: "official" }) ||
        city.country ||
        "",
      lat: Number(city.lat),
      lon: Number(city.lon),
    }));

    // Filtrar por relevancia del query
    const queryLower = query.trim().toLowerCase();
    const filtered = results.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(queryLower);
      const stateMatch = item.state?.toLowerCase().includes(queryLower);
      const exactNameMatch = item.name.toLowerCase() === queryLower;
      const exactStateMatch = item.state?.toLowerCase() === queryLower;

      return exactNameMatch || exactStateMatch || nameMatch || stateMatch;
    });

    console.log(
      `Found ${results.length} total cities, ${filtered.length} filtered for "${query}"`
    );

    // Retornar filtrados si hay coincidencias, sino todos los resultados
    return filtered.length > 0 ? filtered : results.slice(0, 10);
  } catch (error) {
    console.error("Error fetching cities for input:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching cities from OpenWeather"
      );
    }
    throw error;
  }
};

export const getWeatherforSearch = async (lat: number, lon: number) => {
  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured in .env file");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.data || !response.data.main || !response.data.weather) {
      throw new Error("Invalid response structure from weather API");
    }

    const weatherData = {
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      feelsLike: Math.round(response.data.main.feels_like),
      precipitation: response.data.rain ? response.data.rain["1h"] || 0 : 0,
      currentWeather: response.data.weather[0].description,
      weatherId: response.data.weather[0].id,
      temp: Math.round(response.data.main.temp),
    };

    const parsedWeatherData = weatherDataSchema.safeParse(weatherData);

    if (!parsedWeatherData.success) {
      console.warn("Invalid weather data:", parsedWeatherData.error);
      throw new Error("Weather data validation failed");
    }

    return {
      parsedWeatherData: parsedWeatherData.data,
    };
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching weather data from OpenWeather"
      );
    }
    throw error;
  }
};

export const getForecastforSearch = async (lat: number, lon: number) => {
  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured in .env file");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
    );

    const forecastList = response.data.list;

    const dailyData: Record<
      string,
      {
        temps: number[];
        conditions: Record<string, number>;
        icons: Record<string, number>;
      }
    > = {};

    forecastList.forEach((item: any) => {
      const date = item.dt_txt.split(" ")[0];

      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          conditions: {},
          icons: {},
        };
      }

      dailyData[date].temps.push(item.main.temp);

      const condition = item.weather[0].main;
      dailyData[date].conditions[condition] =
        (dailyData[date].conditions[condition] || 0) + 1;

      const icon = item.weather[0].icon;
      dailyData[date].icons[icon] = (dailyData[date].icons[icon] || 0) + 1;
    });

    const result = Object.keys(dailyData)
      .slice(0, 5)
      .map((date) => {
        const temps = dailyData[date].temps;
        const max = Math.max(...temps);
        const min = Math.min(...temps);

        const conditions = dailyData[date].conditions;
        const mostCommonCondition = Object.keys(conditions).reduce((a, b) =>
          conditions[a] > conditions[b] ? a : b
        );

        const icons = dailyData[date].icons;
        const mostCommonIcon = Object.keys(icons).reduce((a, b) =>
          icons[a] > icons[b] ? a : b
        );

        const weatherForecast = {
          date: new Date(date),
          tempMax: Math.round(max),
          tempMin: Math.round(min),
          weatherCondition: mostCommonCondition,
          weatherIcon: `https://openweathermap.org/img/wn/${mostCommonIcon}@2x.png`,
        };

        const parsedForecastData =
          forecastDataSchema.safeParse(weatherForecast);

        if (!parsedForecastData.success) {
          console.warn("Invalid forecast data:", parsedForecastData.error);
          throw new Error("Forecast data validation failed");
        }

        return parsedForecastData.data;
      });

    return result;
  } catch (error) {
    console.error("Error fetching forecast data by coordinates:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching forecast data from OpenWeather"
      );
    }
    throw error;
  }
};

export const getWeatherEvolution = async (lat: number, lon: number) => {
  if (!apiKey) {
    throw new Error("OpenWeather API key is not configured in .env file");
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
    );

    const forecastList = response.data.list;
    console.log("Forecast data for weather evolution:", forecastList);

    const weatherEvolution = forecastList.map((item: any) => {
      const evolutionData = {
        time: item.dt_txt,
        temp: Math.round(item.main.temp),
        tempMax: Math.round(item.main.temp_max),
        tempMin: Math.round(item.main.temp_min),
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        precipitation: item.rain ? item.rain["3h"] || 0 : 0,
        weatherCondition: item.weather[0].main,
        weatherIcon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
      };

      const parsedEvolutionData =
        weatherEvolutionSchema.safeParse(evolutionData);

      if (!parsedEvolutionData.success) {
        console.warn(
          "Invalid weather evolution data:",
          parsedEvolutionData.error
        );
        throw new Error("Weather evolution data validation failed");
      }

      return parsedEvolutionData.data;
    });

    return weatherEvolution;
  } catch (error) {
    console.error("Error fetching weather evolution by coordinates:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching weather evolution from OpenWeather"
      );
    }
    throw error;
  }
};
