import React from "react";
import { useAppStore } from "@/store/useAppStores";
import InputsDash from "@/components/DashboardComponents/InputsDash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import type { ProfileFormValues } from "@/types/settingsTypes";
import { profileSchema } from "@/utils/schemas/settings-schema";

function VistalGeneral() {
  const user = useAppStore((state) => state.user);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profilePicture: "",
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    console.log(data);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <header className="mb-4">
        <h1 className="text-xl font-bold mb-2 text-[var(--sidebar-text)]">
          Información del perfil
        </h1>
        <p className="text-[var(--sidebar-secondary)]">
          Actualiza tu información personal y los detalles de tu perfil.
        </p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Avatar/Profile Picture */}
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center gap-5">
                  <Avatar className="w-50 h-50">
                    <AvatarImage
                      src={field.value || "/default-avatar.png"}
                      alt="Avatar"
                    />
                    <AvatarFallback className="bg-[var(--sidebar-icon)] text-white text-4xl">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/*"
                      name={field.name}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      className="block w-full text-sm text-[var(--sidebar-secondary)]
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[var(--sidebar-icon)] file:text-white
                        file:cursor-pointer
                        hover:file:opacity-80
                        cursor-pointer"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 5 * 1024 * 1024) {
                            alert("El archivo debe ser menor a 5MB.");
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            field.onChange(ev.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                </div>
                <p className="text-s text-[var(--sidebar-secondary)] mt-1">
                  JPG, GIF o PNG. Máx 1MB.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[var(--sidebar-text)]">
                  Nombre
                </FormLabel>
                <FormControl>
                  <InputsDash
                    {...field}
                    placeholder="Ingrese su nombre"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[var(--sidebar-text)]">
                  Email
                </FormLabel>
                <FormControl>
                  <InputsDash
                    {...field}
                    placeholder="Ingrese su email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default VistalGeneral;
