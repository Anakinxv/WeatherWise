import React, { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import InputsDash from "@/components/DashboardComponents/InputsDash";
import SearchCards from "@/components/commonComponents.tsx/SearchCards";
import { useAppStore } from "@/store/useAppStores";

function Buscar() {
  const getWeatherforInputs = useAppStore((state) => state.getWeatherforInputs);
  const isloading = useAppStore((state) => state.isloading);
  const error = useAppStore((state) => state.error);

  const [input, setInput] = useState("");

  const debouncedInput = useDebounce(input, 500);

  const searchWeather = useCallback(
    async (searchTerm: string) => {
      if (!searchTerm || searchTerm.trim().length < 2) {
        return;
      }

      try {
        await getWeatherforInputs(searchTerm);
      } catch (error) {
        console.error("Error searching weather:", error);
      }
    },
    [getWeatherforInputs]
  );

  useEffect(() => {
    searchWeather(debouncedInput);
  }, [debouncedInput, searchWeather]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  return (
    <div>
      {/* Encabezado */}
      <header className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Buscar Ciudad</h1>
        <p className="text-gray-600">
          Ingresa el nombre de una ciudad para ver el clima actual.
        </p>
      </header>

      {/* Input de búsqueda */}
      <section className="flex justify-start mt-4">
        <InputsDash
          type="text"
          placeholder="Buscar ciudad"
          value={input}
          onChange={handleInputChange}
          className="min-w-[300px] w-full max-w-[500px] sm:min-w-[500px]"
        />
      </section>

      {/* Resultados de búsqueda */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {isloading ? (
          <div className="col-span-full flex justify-center items-center p-8">
            <div className="text-lg">Buscando ciudades...</div>
          </div>
        ) : error ? (
          <div className="col-span-full flex justify-center items-center p-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <SearchCards />
        )}
      </section>
    </div>
  );
}

export default Buscar;
