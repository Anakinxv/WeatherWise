import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getForecastWeather } from "@/services/ClimateService";
import { motion } from "framer-motion";
import { ArrowUp, ArrowDown } from "@geist-ui/icons";
import { useAppStore } from "@/store/useAppStores";
import { Temporal } from "@js-temporal/polyfill";

function ForecastCards() {
  const forecastData = useAppStore((state) => state.forecastData);

  // Función para formatear la fecha usando Temporal API
  const formatDate = (dateObj: Date | string) => {
    // Convertir la fecha a un objeto Temporal.PlainDate
    const date =
      dateObj instanceof Date
        ? Temporal.PlainDate.from({
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            day: dateObj.getDate(),
          })
        : Temporal.PlainDate.from(dateObj);

    // Obtener día de la semana abreviado en español
    const weekday = date
      .toLocaleString("es", { weekday: "short" })
      .toUpperCase();

    // Obtener día y mes abreviado
    const day = date.day;
    const month = date.toLocaleString("es", { month: "short" });

    return {
      weekday,
      fullDate: `${day} ${month}`,
    };
  };

  return (
    <>
      {forecastData?.map((data, index) => {
        const dateFormatted = formatDate(data.date);

        return (
          <motion.div
            className="w-full h-full min-w-[150px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.03 }}
            key={index}
          >
            <Card className="bg-[var(--sidebar-bg)] border border-[var(--sidebar-border)]">
              <CardContent className="p-0 bg-[var(--sidebar-bg)]">
                <div className="flex flex-col h-full">
                  {/* Header with date */}
                  <div className="bg-[var(--sidebar-bg)] p-3 text-center">
                    <h3 className="text-lg font-bold text-[var(--sidebar-text)]">
                      {dateFormatted.weekday}
                    </h3>
                    <p className="text-sm text-[var(--sidebar-secondary)]">
                      {dateFormatted.fullDate}
                    </p>
                  </div>

                  {/* Weather icon */}
                  <div className="flex justify-center py-4">
                    <img
                      src={data.weatherIcon}
                      alt="Weather icon"
                      className="h-16 w-16 drop-shadow-md"
                    />
                  </div>

                  {/* Weather details */}
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-center font-medium text-[var(--sidebar-text)]">
                      {data.weatherCondition}
                    </p>
                    <div className="flex justify-between mt-1 text-sm">
                      <div className="flex items-center gap-1">
                        <ArrowDown
                          size={16}
                          color="#60a5fa"
                          className="stroke-3"
                        />
                        <span className="text-[var(--sidebar-secondary)]">
                          {data.tempMin}°C
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ArrowUp
                          size={16}
                          color="#fb923c"
                          className="stroke-3"
                        />
                        <span className="text-[var(--sidebar-secondary)]">
                          {data.tempMax}°C
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </>
  );
}

export default ForecastCards;
