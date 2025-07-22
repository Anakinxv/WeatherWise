import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTheme } from "@/context/ThemeContext";

const preferencesSchema = z.object({
  units: z.enum(["metric", "imperial"]),
  theme: z.enum(["light", "dark", "system"]),
});

type PreferencesFormValues = z.infer<typeof preferencesSchema>;

function Preferencias() {
  const { theme, setTheme, actualTheme } = useTheme();

  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      units: "metric",
      theme: "system",
    },
  });

  const handleTheme = (value: "light" | "dark" | "system") => {
    setTheme(value);
  };

  const onSubmit = (data: PreferencesFormValues) => {
    console.log("Preferencias guardadas:", data);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Encabezado */}
      <header className="mb-4">
        <h1 className="text-xl font-bold mb-2 text-[var(--sidebar-text)]">
          Preferencias
        </h1>
        <p className="text-[var(--sidebar-secondary)]">
          Personaliza tu experiencia en la aplicación
        </p>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full flex-1"
        >
          <div className="space-y-8">
            {/* Unidades */}
            <FormField
              control={form.control}
              name="units"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[var(--sidebar-text)] text-lg font-semibold">
                    Unidades
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[var(--sidebar-nav-bg)] border-[var(--sidebar-border)] text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover-bg)]">
                        <SelectValue placeholder="Selecciona el sistema de unidades" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[var(--sidebar-nav-bg)] border-[var(--sidebar-border)] shadow-lg">
                      <SelectItem
                        value="metric"
                        className="text-[var(--sidebar-text)] hover:bg-[var(--sidebar-icon)] hover:text-white focus:bg-[var(--sidebar-icon)] focus:text-white"
                      >
                        Métrico (°C, km/h)
                      </SelectItem>
                      <SelectItem
                        value="imperial"
                        className="text-[var(--sidebar-text)] hover:bg-[var(--sidebar-icon)] hover:text-white focus:bg-[var(--sidebar-icon)] focus:text-white"
                      >
                        Imperial (°F, mph)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tema */}
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[var(--sidebar-text)] text-lg font-semibold">
                    Tema
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTheme(value as "light" | "dark" | "system");
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-[var(--sidebar-nav-bg)] border-[var(--sidebar-border)] text-[var(--sidebar-text)] hover:bg-[var(--sidebar-hover-bg)]">
                        <SelectValue placeholder="Selecciona el tema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-[var(--sidebar-nav-bg)] border-[var(--sidebar-border)] shadow-lg">
                      <SelectItem
                        value="light"
                        className="text-[var(--sidebar-text)] hover:bg-[var(--sidebar-icon)] hover:text-white focus:bg-[var(--sidebar-icon)] focus:text-white"
                      >
                        Claro
                      </SelectItem>
                      <SelectItem
                        value="dark"
                        className="text-[var(--sidebar-text)] hover:bg-[var(--sidebar-icon)] hover:text-white focus:bg-[var(--sidebar-icon)] focus:text-white"
                      >
                        Oscuro
                      </SelectItem>
                      <SelectItem
                        value="system"
                        className="text-[var(--sidebar-text)] hover:bg-[var(--sidebar-icon)] hover:text-white focus:bg-[var(--sidebar-icon)] focus:text-white"
                      >
                        Sistema
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end items-center pt-6 mt-8 ">
            <Button
              type="submit"
              className="bg-[var(--sidebar-icon)] text-white hover:opacity-80"
            >
              Guardar cambios
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Preferencias;
