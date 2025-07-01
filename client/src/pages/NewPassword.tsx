import React, { useState, useEffect } from "react";
import AuthCard from "@/components/authComponents/AuthCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import AuthButtons from "@/components/authComponents/AuthButtons";
import AuthInPuts from "@/components/authComponents/AuthInputs";
import { newPasswordSchema } from "../utils/schemas/auth-schema";
import type { newPasswordType } from "@/types/authTypes";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/useAppStores";

function NewPassword() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const changePassword = useAppStore((state) => state.changePassword);
  const error = useAppStore((state) => state.error);
  const resetEmail = useAppStore((state) => state.resetEmail);
  const resetCode = useAppStore((state) => state.resetCode);

  const newPasswordText = {
    title: "Nueva contraseña",
    description: "Crea una nueva contraseña para tu cuenta.",
  };

  const form = useForm<newPasswordType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    // Verificar si tenemos los datos necesarios
    if (!resetEmail || !resetCode) {
      navigate("/forgot-password");
    }
  }, [resetEmail, resetCode, navigate]);

  useEffect(() => {
    if (isSubmitted && !error) {
      navigate("/login");
      setIsSubmitted(false);
    }
  }, [isSubmitted, error, navigate]);

  const handleSubmit = form.handleSubmit(async (data: newPasswordType) => {
    if (!resetEmail || !resetCode) {
      console.error("Missing resetEmail or resetCode");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await changePassword({
        email: resetEmail,
        code: resetCode,
        password: data.password,
      });

      if (success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error during changePassword:", error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <AuthCard
      title={newPasswordText.title}
      description={newPasswordText.description}
    >
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}

      <Form {...form}>
        <form
          className="w-full flex flex-col justify-around h-full gap-4"
          onSubmit={handleSubmit}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInPuts
                    type="password"
                    placeholder="Nueva contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInPuts
                    type="password"
                    placeholder="Confirmar contraseña"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AuthButtons disabled={isSubmitting}>
            {isSubmitting ? "Procesando..." : "Resetear contraseña"}
          </AuthButtons>
        </form>
      </Form>
    </AuthCard>
  );
}

export default NewPassword;
