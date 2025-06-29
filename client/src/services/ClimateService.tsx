import axios from "axios";

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

    console.log("Weather data fetched successfully:", response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
