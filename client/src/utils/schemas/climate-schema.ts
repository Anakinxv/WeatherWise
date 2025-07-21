import { date, z } from "zod";

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

export const weatherEvolutionSchema = z.object({
  time: z.string().describe("Time of the forecast data point"),
  temp: z.number().describe("Temperature in Celsius at the given time"),
  tempMax: z.number().describe("Maximum temperature in Celsius"),
  tempMin: z.number().describe("Minimum temperature in Celsius"),
  humidity: z.number().describe("Humidity percentage (0-100)"),
  windSpeed: z.number().describe("Wind speed in meters per second"),
  precipitation: z.number().describe("Precipitation amount in mm"),
});

// Schema for city/location data from geocoding API (updated)
export const cityLocationSchema = z.object({
  name: z.string().describe("City name"),
  country: z.string().describe("Country code (ISO 3166-1 alpha-2)"),
  countryFull: z.string().describe("Full country name"),
  state: z.string().nullable().describe("State/province name (can be null)"),
  tempMax: z
    .number()
    .optional()
    .describe("Current temperature in Celsius (optional)"),
  TempMin: z
    .string()
    .optional()
    .describe("Minimum temperature in Celsius (optional)"),
  date: z.date().describe("Date of the forecast"),
  weatherCondition: z.string().describe("Weather condition description"),
  weatherIcon: z.string().url().describe("Weather icon URL"),
  lat: z.number().describe("Latitude of the city"),
  lon: z.number().describe("Longitude of the city"),
});
