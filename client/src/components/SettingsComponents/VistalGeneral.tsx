import React from "react";
import InputsDash from "@/components/DashboardComponents/InputsDash";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAppStore } from "@/store/useAppStores";

function VistalGeneral() {
  // Get user and store functions
  const user = useAppStore((state) => state.user);
  const updateProfile = useAppStore((state) => state.updateProfile);
  const error = useAppStore((state) => state.error);

  // Función mejorada para obtener las iniciales del usuario
  const getUserInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const userInitials = getUserInitials(user?.name);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profilePictureUrl: user?.profilePictureUrl || "",
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    
    console.log(user);
    

    if (!user?.id) {
      console.error("User ID is not available");
      return;
    }
    try {
      await updateProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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

      {/* Show error if exists */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Avatar/Profile Picture URL */}
          <FormField
            control={form.control}
            name="profilePictureUrl"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-center gap-5">
                  <Avatar className="w-50 h-50">
                    {field.value || user?.profilePictureUrl ? (
                      <AvatarImage
                        src={
                          field.value ||
                          user?.profilePictureUrl ||
                          "/default-avatar.png"
                        }
                        alt="Avatar"
                      />
                    ) : (
                      <AvatarFallback
                        className="text-white text-4xl"
                        style={{ backgroundColor: "var(--sidebar-icon)" }}
                      >
                        {userInitials}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <FormControl>
                      <InputsDash
                        {...field}
                        placeholder="URL de la foto de perfil"
                        type="text"
                      />
                    </FormControl>
                  </div>
                </div>
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
