import axios from "axios";
import {
  weatherDataSchema,
  forecastDataSchema,
} from "../utils/schemas/climate-schema";

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
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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
      console.warn("Invalid weather data:", parsedWeatherData.error);
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
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
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
