import React, { useState, useEffect } from "react";

import { useDebounce } from "@uidotdev/usehooks";
import InputsDash from "@/components/DashboardComponents/InputsDash";
import SearchCards from "@/components/commonComponents.tsx/SearchCards";
import { useAppStore } from "@/store/useAppStores";

function Buscar() {
  const getWeatherforInputs = useAppStore((state) => state.getWeatherforInputs);

  // Estado para el input de búsqueda
  const [input, setInput] = useState("");
  // Input con debounce para evitar llamadas excesivas
  const debouncedInput = useDebounce(input, 500);

  // Efecto para buscar clima cuando cambia el input debounced
  useEffect(() => {
    if (debouncedInput.trim() !== "") {
      getWeatherforInputs(debouncedInput);
    }
  }, [debouncedInput]);

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
          onChange={(e) => setInput(e.target.value)}
          className="min-w-[300px] w-full max-w-[500px] sm:min-w-[500px]"
        />
      </section>

      {/* Resultados de búsqueda */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        <SearchCards />
      </section>
    </div>
  );
}

export default Buscar;
