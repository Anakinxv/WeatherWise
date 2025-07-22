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
import InputsDash from "@/components/DashboardComponents/InputsDash";

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "La contraseña actual es requerida"),
    newPassword: z
      .string()
      .min(8, "La nueva contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
      ),
    confirmPassword: z.string().min(1, "Confirma tu nueva contraseña"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type SecurityFormValues = z.infer<typeof securitySchema>;

function Seguridad() {
  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SecurityFormValues) => {
    console.log("Contraseña actualizada:", data);
    form.reset();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Encabezado */}
      <header className="mb-4">
        <h1 className="text-xl font-bold mb-2 text-[var(--sidebar-text)]">
          Seguridad
        </h1>
        <p className="text-[var(--sidebar-secondary)]">
          Actualiza tu contraseña y configura opciones de seguridad
        </p>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between h-full flex-1"
        >
          <div className="space-y-8">
            {/* Contraseña actual */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[var(--sidebar-text)] text-lg font-semibold">
                    Contraseña actual
                  </FormLabel>
                  <FormControl>
                    <InputsDash
                      {...field}
                      type="password"
                      placeholder="Ingresa tu contraseña actual"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nueva contraseña */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[var(--sidebar-text)] text-lg font-semibold">
                    Nueva contraseña
                  </FormLabel>
                  <FormControl>
                    <InputsDash
                      {...field}
                      type="password"
                      placeholder="Ingresa tu nueva contraseña"
                    />
                  </FormControl>
                  <p className="text-sm text-[var(--sidebar-secondary)]">
                    Mínimo 8 caracteres con al menos una mayúscula, una
                    minúscula y un número
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirmar contraseña */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[var(--sidebar-text)] text-lg font-semibold">
                    Confirmar contraseña
                  </FormLabel>
                  <FormControl>
                    <InputsDash
                      {...field}
                      type="password"
                      placeholder="Confirma tu nueva contraseña"
                    />
                  </FormControl>
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

export default Seguridad;
