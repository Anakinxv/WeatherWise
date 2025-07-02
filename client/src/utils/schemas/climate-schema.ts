import { z } from "zod";

// Schema for validating weather data from the API
export const weatherDataSchema = z.object({
  humidity: z.number().min(0).max(100).describe("Humidity percentage (0-100)"),

  wind: z.number().nonnegative().describe("Wind speed in meters per second"),

  feelsLike: z.number().describe("'Feels like' temperature in Celsius"),

  precipitation: z
    .number()
    .nonnegative()
    .default(0)
    .describe("Precipitation amount in mm for the last hour"),

  currentWeather: z
    .string()
    .describe("Text description of current weather conditions"),

  weatherId: z
    .number()
    .int()
    .describe("OpenWeather API weather condition code"),

  temp: z.number().describe("Current temperature in Celsius"),
});

export const forecastDataSchema = z.object({
  date: z.date().describe("Date of the forecast"),
  tempMax: z.number().describe("Maximum temperature in Celsius"),
  tempMin: z.number().describe("Minimum temperature in Celsius"),
  weatherCondition: z.string().describe("Weather condition description"),
  weatherIcon: z.string().url().describe("Weather icon URL"),
});
