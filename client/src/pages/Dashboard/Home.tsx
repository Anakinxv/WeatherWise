import EntranceCard from "../../components/HomeDashboardComponents/EntranceCard";
import { getWeather } from "../../services/ClimateService";
import {
  getCountries,
  getCitiesByCountry,
} from "../../services/CountriesService";

function Home() {
  // console.log("Fetching weather data...");
  // getWeather();
  console.log("Fetching countries data...");
  getCountries();
  console.log("Fetching cities data for Spain...");
  getCitiesByCountry("Dominican Republic");
  return (
    <div>
      <EntranceCard />
    </div>
  );
}

export default Home;
