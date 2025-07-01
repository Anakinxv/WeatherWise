import React, { useEffect, useState } from "react";
import AuthCard from "../components/authComponents/AuthCard";
import AuthInPuts from "@/components/authComponents/AuthInputs";
import AuthButtons from "@/components/authComponents/AuthButtons";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { forgotPasswordSchema } from "../utils/schemas/auth-schema";
import type { forgotPasswordType } from "@/types/authTypes";
import { useAppStore } from "@/store/useAppStores";

function ForgotPassword() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPassword } = useAppStore((state) => state);
  const { error } = useAppStore((state) => state);

  const form = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordText = {
    title: "Recuperar contraseña",
    description: "Ingresa tu correo electrónico para recuperar tu contraseña.",
  };

  // Efecto para manejar la navegación cuando el estado de error se actualice
  useEffect(() => {
    if (isSubmitted && !error) {
      // Usar ruta absoluta en lugar de relativa
      navigate("/reset-password");
      setIsSubmitted(false);
    }
  }, [error, isSubmitted, navigate]);

  const handleSubmit = form.handleSubmit(async (values: forgotPasswordType) => {
    console.log("Form submitted with values:", values);

    try {
      const success = await forgotPassword(values.email);

      // Solo marcar como enviado si fue exitoso
      if (success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error during forgot password:", error);
    }
  });

  return (
    <AuthCard
      title={forgotPasswordText.title}
      description={forgotPasswordText.description}
    >
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}

      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col justify-around h-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInPuts type="email" placeholder="Email" {...field} />
                </FormControl>
                {form.formState.errors.email && (
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <AuthButtons>Enviar Codigo</AuthButtons>
        </form>
      </Form>
    </AuthCard>
  );
}

export default ForgotPassword;
