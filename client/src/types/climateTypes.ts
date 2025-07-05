import {
  weatherDataSchema,
  forecastDataSchema,
  weatherEvolutionSchema,
  cityLocationSchema,
} from "../utils/schemas/climate-schema";
import { z } from "zod";

export type WeatherDataType = z.infer<typeof weatherDataSchema>;

export type ForecastDataType = z.infer<typeof forecastDataSchema>;

export type WeatherEvolutionType = z.infer<typeof weatherEvolutionSchema>;

export type CityLocationType = z.infer<typeof cityLocationSchema>;
