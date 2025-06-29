import React from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Combobox } from "../../components/commonComponents.tsx/Combobox";
import { Temporal } from "@js-temporal/polyfill";

import { useAuthStore } from "@/store/useAppStores";
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
  const dia = diasDeLaSemana[diaDeLaSemana - 1];
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

  const user = useAuthStore((state) => state.user);
  return (
    <Card className="w-full grid grid-cols-2 gap-8 h-full min-h-[380px] bg-[url('/src/assets/prueba.png')] bg-cover bg-center bg-no-repeat relative before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-[#004499]/80 before:to-[#004499]/50 overflow-hidden border-0">
      <CardContent className="flex flex-col justify-between relative z-10 text-white">
        <CardTitle className="text-2xl font-bold text-white">
          Bienvenido de vuelta {user?.name}
        </CardTitle>

        {/* Sección de hora y fecha */}
        <div className="mt-2 flex flex-col space-y-5">
          <div className="mb-6">
            <CardTitle className="text-6xl mb-1 text-white"></CardTitle>
            <CardDescription className="text-base text-white/70">
              Jueves, 11 de julio | 08:10 AM
            </CardDescription>
          </div>

          {/* Sección de pronóstico */}
          <div className="">
            <CardTitle className="text-lg mb-1 text-white">
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
      </CardContent>

      <CardContent className="flex flex-col justify-between items-end relative z-10 text-white">
        <div className="flex">
          <Combobox></Combobox>
        </div>

        <div className="grid grid-cols-2 gap-4 p-4">
          <div>
            <CardTitle className="text-lg text-white">Humedad</CardTitle>
            <CardDescription className="text-base text-white/70">
              45%
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-lg text-white">Viento</CardTitle>
            <CardDescription className="text-base text-white/70">
              12 km/h
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-lg text-white">Precipitación</CardTitle>
            <CardDescription className="text-base text-white/70">
              0%
            </CardDescription>
          </div>
          <div>
            <CardTitle className="text-lg text-white">
              Sensación térmica
            </CardTitle>
            <CardDescription className="text-base text-white/70">
              26 °C
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EntranceCard;
