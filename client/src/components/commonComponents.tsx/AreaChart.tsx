import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import type { WeatherEvolutionType } from "@/types/climateTypes";
import { Temporal } from "@js-temporal/polyfill";

import { useAppStore } from "@/store/useAppStores";

const chartConfig = {
  temp: {
    label: "Temperatura",
    color: "hsl(var(--chart-1))",
  },
  humidity: {
    label: "Humedad",
    color: "hsl(var(--chart-4))",
  },
  windSpeed: {
    label: "Viento",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

function AreaChart() {
  const weatherEvolution = useAppStore((state) => state.weatherEvolution);

  const formatedData = weatherEvolution?.map((data) => {
    const original = Temporal.PlainDateTime.from(data.time);

    const weekday = original
      .toLocaleString("es", {
        weekday: "short",
      })
      .toUpperCase();

    const fullHour = original.hour.toString().padStart(2, "0") + ":00";

    return {
      ...data,
      time: `${weekday} ${fullHour}`,
      // Normalizar humedad para que se vea mejor en el gráfico (dividir por 4)
      humidity: Math.round(data.humidity / 4),
      // Multiplicar viento por 3 para mejor visualización
      windSpeed: Math.round(data.windSpeed * 3),
    };
  });

  if (!formatedData || formatedData.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Evolución del Clima</CardTitle>
          <CardDescription>No hay datos disponibles</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={formatedData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
              bottom: 60,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={Math.ceil(formatedData.length / 8)}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
              content={({ active, payload, label }) => {
                if (!active || !payload || !payload.length) {
                  return null;
                }

                return (
                  <div className="rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] p-3 shadow-md">
                    <div className="grid gap-2">
                      <div className="font-medium text-[var(--sidebar-text)] text-center border-b border-[var(--sidebar-border)] pb-2">
                        {label}
                      </div>
                      {payload.map((entry, index) => {
                        let displayValue = entry.value;
                        let unit = "";

                        switch (entry.dataKey) {
                          case "temp":
                            unit = "°C";
                            break;
                          case "humidity":
                            displayValue = (entry.value as number) * 4;
                            unit = "%";
                            break;
                          case "windSpeed":
                            displayValue =
                              Math.round(((entry.value as number) / 3) * 10) /
                              10;
                            unit = " m/s";
                            break;
                        }

                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between gap-3 py-1"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="h-3 w-3 rounded-full shadow-sm"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span
                                className="text-sm font-medium"
                                style={{ color: entry.color }}
                              >
                                {
                                  chartConfig[
                                    entry.dataKey as keyof typeof chartConfig
                                  ]?.label
                                }
                              </span>
                            </div>
                            <span className="text-sm font-bold text-[var(--sidebar-text)]">
                              {displayValue}
                              {unit}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }}
            />

            {/* Línea de temperatura actual */}
            <Line
              dataKey="temp"
              type="monotone"
              stroke="var(--color-temp)"
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 5,
                strokeWidth: 2,
                fill: "var(--color-temp)",
              }}
            />

            {/* Línea de humedad (normalizada) */}
            <Line
              dataKey="humidity"
              type="monotone"
              stroke="var(--color-humidity)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 2,
                fill: "var(--color-humidity)",
              }}
            />

            {/* Línea de velocidad del viento (escalada) */}
            <Line
              dataKey="windSpeed"
              type="monotone"
              stroke="var(--color-windSpeed)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                strokeWidth: 2,
                fill: "var(--color-windSpeed)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default AreaChart;
