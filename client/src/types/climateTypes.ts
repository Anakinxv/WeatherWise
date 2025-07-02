import {
  weatherDataSchema,
  forecastDataSchema,
} from "../utils/schemas/climate-schema";
import { z } from "zod";

export type WeatherDataType = z.infer<typeof weatherDataSchema>;

export type ForecastDataType = z.infer<typeof forecastDataSchema>;
