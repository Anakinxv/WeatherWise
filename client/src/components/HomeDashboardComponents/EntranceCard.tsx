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

  // Formatear día y mes directamente con la API Temporal
  const diaDeLaSemanaStr = now.toLocaleString("es", { weekday: "long" });
  const mesStr = now.toLocaleString("es", { month: "long" });

  const monthDay = now.day;
  const timeDay =
    now.hour.toString().padStart(2, "0") +
    ":" +
    now.minute.toString().padStart(2, "0");
  const ampm = now.hour >= 12 ? "PM" : "AM";

  const user = useAppStore((state) => state.user);
  const currentWeather = useAppStore((state) => state.weatherData);

  // Returns the background image URL based on weatherId
  const getBackgroundImageUrl = () => {
    const id = currentWeather?.weatherId;
    if (!id)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Clear_hehu3i.jpg";

    if (id >= 200 && id <= 232)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Thunderstorm_cqdgal.jpg";
    if (id >= 300 && id <= 321)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Drizzle_atq1kk.jpg";
    if (id >= 500 && id <= 531)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Rain_ugg6nl.jpg";
    if (id >= 600 && id <= 622)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412813/Snow_rhselv.jpg";
    if (id >= 701 && id <= 781)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Atmosphere_bxqfwg.jpg";
    if (id === 800)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Clear_hehu3i.jpg";
    if (id >= 801 && id <= 804)
      return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Clouds_blaah4.jpg";
    return "https://res.cloudinary.com/dy2wtanhl/image/upload/v1751412812/Clear_hehu3i.jpg";
  };

  return (
    <Card
      className="w-full h-full min-h-[380px] flex flex-col bg-cover bg-center bg-no-repeat relative before:absolute before:content-[''] before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-[#004499]/80 before:to-[#004499]/50 overflow-hidden border-0 flex-1"
      style={{
        backgroundImage: `url('${getBackgroundImageUrl()}')`,
      }}
    >
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
      <CardContent className="col-span-2 grid grid-cols-2 justify-between items-center w-full relative z-10 text-white pl-8 pr-8 pb-6 pt-0 flex-1">
        {/* Time and date section */}
        <div className="flex flex-col justify-center mb-4 pr-8 gap-8 h-full">
          {/* Hora y fecha */}
          <div className="flex flex-col gap-2">
            <CardTitle className="text-6xl mb-0 text-white">
              {timeDay + " " + ampm}
            </CardTitle>
            <CardDescription className="text-base text-white/70">
              {`${diaDeLaSemanaStr}, ${mesStr} ${monthDay}`}
            </CardDescription>
          </div>
          {/* Pronóstico */}
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl mb-0 text-white">
              Pronóstico del tiempo
            </CardTitle>
            <CardDescription className="text-lg text-white/70">
              {currentWeather?.currentWeather}
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
                  {currentWeather?.humidity}%
                </CardDescription>
              </div>

              <div className="text-right">
                <CardTitle className="text-lg text-white mb-0">
                  Viento
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                  {currentWeather?.wind} m/s
                </CardDescription>
              </div>

              <div>
                <CardTitle className="text-lg text-white mb-0">
                  Precipitación
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                  {currentWeather?.precipitation} mm
                </CardDescription>
              </div>

              <div className="text-right">
                <CardTitle className="text-lg text-white mb-0">
                  Sensación térmica
                </CardTitle>
                <CardDescription className="text-base text-white/70">
                  {currentWeather?.feelsLike} °C
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
