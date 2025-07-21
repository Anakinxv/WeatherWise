import AreaChart from "@/components/commonComponents.tsx/AreaChart";
import EntranceCard from "../../components/HomeDashboardComponents/EntranceCard";
import { getWeather } from "../../services/ClimateService";
import ForecastCards from "@/components/commonComponents.tsx/ForecastCards";

function VerDetallesDeBusqueda() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 px-2 md:px-4 lg:px-6 py-4 md:py-6 max-w-7xl mx-auto">
      {/* Sección de tarjeta de entrada */}
      <section className="w-full">
        <EntranceCard />
      </section>

      {/* Sección de pronóstico de 5 días */}
      <section className="w-full">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--sidebar-text)] mb-2">
            Pronóstico de 5 días
          </h2>
          <p className="text-sm md:text-base text-[var(--sidebar-secondary)] leading-relaxed">
            Previsión meteorológica detallada para los próximos días
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-6">
          <ForecastCards />
        </div>
      </section>

      {/* Sección de evolución del clima */}
      <section className="w-full">
        <div className="mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-[var(--sidebar-text)] mb-2">
            Evolución del clima en los próximos 5 días
          </h2>
          <p className="text-sm md:text-base text-[var(--sidebar-secondary)] leading-relaxed">
            Visualiza la evolución de la temperatura, humedad y viento cada 3
            horas
          </p>
        </div>

        <div className="w-full overflow-hidden">
          <AreaChart />
        </div>
      </section>
    </div>
  );
}

export default VerDetallesDeBusqueda;
