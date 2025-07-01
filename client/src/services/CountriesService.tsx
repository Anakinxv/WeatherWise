import axios from "axios";
import type { CountryType, StateType } from "../utils/schemas/geo-schema";
import { countrySchema, stateSchema } from "../utils/schemas/geo-schema";

const apiUrl = "https://countriesnow.space/api/v0.1";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${apiUrl}/countries`);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response structure from countries API");
    }

    // Cambiar de 'country' a 'name' para que coincida con el Combobox
    const countries = response.data.data.map((country: any, index: number) => ({
      id: index + 1,
      name: country.country,
    }));

    console.log("Countries data fetched successfully:", countries);

    // Validate each country against the country schema
    countries.forEach((country: any) => {
      const parsedCountry = countrySchema.safeParse(country);
      if (!parsedCountry.success) {
        console.warn(`Invalid country data: ${JSON.stringify(country)}`);
      }
    });

    return countries;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    throw error;
  }
};

export const getCitiesByCountry = async (countryName: string) => {
  try {
    console.log("Fetching cities for country:", countryName);

    // Usar POST como indica la documentación de la API
    const response = await axios.post(`${apiUrl}/countries/states`, {
      country: countryName, // Pasar string directamente, no objeto
    });

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response structure from cities API");
    }

    const cities = response.data.data.states.map(
      (state: any, index: number) => ({
        id: index + 1,
        name: state.name,
      })
    );

    const splitedCities = cities.map((city: { id: number; name: string }) => ({
      id: city.id,
      name: city.name
        .split(" ")
        .filter((word) => word !== "Province")
        .join(" "),
    }));

    console.log("Cities data fetched successfully:", splitedCities);

    // Validate each city against the state schema
    splitedCities.forEach((city: any) => {
      const parsedCity = stateSchema.safeParse(city);
      if (!parsedCity.success) {
        console.warn(`Invalid city data: ${JSON.stringify(city)}`);
      }
    });

    return splitedCities;
  } catch (error) {
    console.error("Error fetching cities data:", error);
    throw error;
  }
};
