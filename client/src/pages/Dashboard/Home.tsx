import EntranceCard from "../../components/HomeDashboardComponents/EntranceCard";
import { getWeather } from "../../services/ClimateService";
import ForecastCards from "@/components/commonComponents.tsx/ForecastCards";

function Home() {
  return (
    <div className="flex flex-col gap-8 px-1 py-4">
      <section className="w-full">
        <EntranceCard />
      </section>

      <section className="w-full ">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-[var(--sidebar-text)]">
            Pronóstico de 5 días
          </h2>
          <p className="text-sm text-[var(--sidebar-secondary)]">
            Previsión meteorológica detallada para los próximos días
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ForecastCards />
        </div>
      </section>
    </div>
  );
}

export default Home;
