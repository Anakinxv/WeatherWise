import axios from "axios";

const apiUrl = "https://countriesnow.space/api/v0.1";

export const getCountries = async () => {
  try {
    const response = await axios.get(`${apiUrl}/countries`);

    if (!response.data || !response) {
      throw new Error("Invalid response structure from countries API");
    }

    const countries = response.data.data.map((country: any) => ({
      country: country.country,
    }));

    console.log("Countries data fetched successfully:", countries);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching countries data:", error);
  }
};

export const getCitiesByCountry = async (country: string) => {
  try {
    const response = await axios.post(`${apiUrl}/countries/states`, {
      country: country,
    });

    if (!response.data || !response.data.data) {
      throw new Error("Invalid response structure from cities API");
    }

    const cities = response.data.data.states.map((state: any) => ({
      name: state.name,
    }));

    const splitedCities = cities.map((city: { name: string }) => ({
      name: city.name
        .split(" ")
        .filter((word) => word !== "Province")
        .join(" "),
    }));

    console.log("Cities data:", splitedCities);
  } catch (error) {
    console.error("Error fetching cities data:", error);
    throw error;
  }
};
