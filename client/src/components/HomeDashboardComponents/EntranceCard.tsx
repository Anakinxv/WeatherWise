import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Temporal } from "@js-temporal/polyfill";
import { Combobox } from "@/components/commonComponents.tsx/Combobox";
import { useAppStore } from "@/store/useAppStores";

function EntranceCard() {
  const now = Temporal.Now.zonedDateTimeISO();

  const diaDeLaSemana = now.dayOfWeek;
  const diasDeLaSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const mes = now.month;
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const monthDay = now.day;
  const timeDay =
    now.hour.toString().padStart(2, "0") +
    ":" +
    now.minute.toString().padStart(2, "0");
  const ampm = now.hour >= 12 ? "PM" : "AM";

  const user = useAppStore((state) => state.user);

  return (
    <Card className="w-full h-full min-h-[380px] flex flex-col bg-[url('/Users/emmanuel2503/WeatherWise/client/src/assets/prueba.png')] bg-cover bg-center bg-no-repeat relative before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-[#004499]/80 before:to-[#004499]/50 overflow-hidden border-0 flex-1">
      {/* Header section with title and location selector */}
      <div className="w-full relative z-10 p-6">
        <div className="flex justify-between items-center w-full">
          <CardTitle className="text-2xl font-bold text-white">
            Bienvenido de vuelta {user?.name}
          </CardTitle>
          <Combobox />
        </div>
      </div>

      {/* Main content in two columns */}
      <CardContent className="col-span-2 grid grid-cols-2 justify-between  items-center  w-full relative z-10 text-white pl-8 pr-8 pb-6 pt-0 flex-1">
        {/* Time and date section */}
        <div className="flex flex-col justify-center mb-4 pr-8 gap-8 h-full">
          {/* Hora y fecha */}
          <div className="flex flex-col gap-2">
            <CardTitle className="text-6xl mb-0 text-white">
              {timeDay + " " + ampm}
            </CardTitle>
            <CardDescription className="text-base text-white/70">
              {diasDeLaSemana[diaDeLaSemana] +
                ", " +
                meses[mes - 1] +
                " " +
                monthDay}
            </CardDescription>
          </div>
          {/* Pronóstico */}
          <div className="flex flex-col gap-2">
            <CardTitle className="text-lg mb-0 text-white">
              Pronóstico del tiempo
            </CardTitle>
            <CardDescription className="text-sm text-white/70">
              Parcialmente nublado
            </CardDescription>
            <CardDescription className="text-sm text-white/70">
              Tormentas aisladas, precipitación: 30%
            </CardDescription>
          </div>
        </div>

        {/* Weather metrics section */}
        <div className="w-full flex items-center justify-end ">
          <div className="flex justify-end">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full justify-end">
              <div>
                <CardTitle className="text-lg text-white mb-0">
                  Humedad
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                  45%
                </CardDescription>
              </div>

              <div className="text-right">
                <CardTitle className="text-lg text-white mb-0">
                  Viento
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                  12 km/h
                </CardDescription>
              </div>

              <div>
                <CardTitle className="text-lg text-white mb-0">
                  Precipitación
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                  0%
                </CardDescription>
              </div>

              <div className="text-right">
                <CardTitle className="text-lg text-white mb-0">
                  Sensación térmica
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                  26 °C
                </CardDescription>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EntranceCard;
