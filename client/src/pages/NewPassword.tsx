import React from "react";
import AuthCard from "@/components/authComponents/AuthCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import AuthButtons from "@/components/authComponents/AuthButtons";
import AuthInPuts from "@/components/authComponents/AuthInputs";
// import { newPasswordSchema } from "../utils/schemas/auth-schema";
// import type { newPasswordType } from "@/types/authTypes";

function NewPassword() {
  const newPasswordText = {
    title: "Nueva contraseña",
    description: "Crea una nueva contraseña para tu cuenta.",
  };

  const form = useForm({
    // resolver: zodResolver(newPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  return (
    <AuthCard
      title={newPasswordText.title}
      description={newPasswordText.description}
    >
      <Form {...form}>
        <form className="w-full flex flex-col justify-around h-full">
          <FormField
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInPuts
                    type="password"
                    placeholder="Nueva contraseña"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
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
              </FormItem>
            )}
          />
          <AuthButtons>Resetear contraseña</AuthButtons>
        </form>
      </Form>
    </AuthCard>
  );
}

export default NewPassword;
