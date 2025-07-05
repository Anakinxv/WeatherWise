import React from "react";
import { Star } from "@geist-ui/icons";
import { useAppStore } from "@/store/useAppStores";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import iconLluvia from "@/assets/iconLLUVIA.png";
function SearchCards() {
  const searchedCity = useAppStore((state) => state.searchedCity);

  console.log("searchedCity", searchedCity);

  if (!searchedCity || searchedCity.length === 0) {
    return (
      <div className="col-span-full text-center text-gray-500 py-10">
        No hay resultados. Busca una ciudad para ver el clima.
      </div>
    );
  }

  return (
    <>
      {searchedCity.map((city: any, idx: number) => (
        <motion.div
          key={city.name + city.country + idx}
          className="w-full h-full min-w-[150px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <Card className="bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)] flex flex-col h-full p-0">
            <CardHeader className="pb-2 pt-6 px-6">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-[var(--sidebar-text)] text-2xl font-bold mb-1">
                    {city.name}
                    {city.state ? (
                      <span className="text-base font-normal text-gray-400">
                        , {city.state}
                      </span>
                    ) : null}
                  </CardTitle>
                  <p className="text-[var(--sidebar-text)] opacity-70 text-sm font-normal">
                    {city.countryFull}
                  </p>
                </div>
                <button className="p-1 rounded-full">
                  <Star className="stroke-yellow-400  w-6 h-6" />
                </button>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-4 flex-grow">
              <div className="flex items-center justify-between h-full">
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-[var(--sidebar-text)]">
                      --°C
                    </span>
                  </div>
                  <p className="text-[var(--sidebar-text)] opacity-80 text-base font-medium">
                    {/* Aquí puedes poner el estado del clima si lo tienes */}
                    --
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <img src={iconLluvia} alt="" className="h-30 w-30" />
                </div>
              </div>
            </CardContent>

            <div className="bg-[var(--sidebar-border)] hover:opacity-70 transition-opacity duration-200 p-0 border-t border-[var(--sidebar-border)] rounded-b-lg">
              <button className="w-full h-full text-[var(--sidebar-text)] py-3 px-4 rounded-b-lg hover:bg-opacity-80 transition-colors duration-200 flex items-center justify-center">
                Ver detalles
              </button>
            </div>
          </Card>
        </motion.div>
      ))}
    </>
  );
}

export default SearchCards;
