import React from "react";
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
function ForgotPassword() {
  const navigate = useNavigate();

  const form = useForm<forgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordText = {
    title: "Recuperar contraseña",
    description: "Ingresa tu correo electrónico para recuperar tu contraseña.",
  };

  const handleSubmit = form.handleSubmit((values: forgotPasswordType) => {
    console.log("Form submitted with values:", values);

    navigate("/reset-password"); // Redirect to reset password page after submitting
  });

  return (
    <AuthCard
      title={forgotPasswordText.title}
      description={forgotPasswordText.description}
    >
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
