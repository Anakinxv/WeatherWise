import React from "react";
import AuthCard from "../components/authComponents/AuthCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/schemas/auth-schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";

import AuthInputs from "../components/authComponents/AuthInputs";
import AuthButtons from "../components/authComponents/AuthButtons";
import { useNavigate, Link } from "react-router-dom";
import type { registerType } from "@/types/authTypes";

function Resgister() {
  const navigate = useNavigate();

  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = form.handleSubmit((values: registerType) => {
    console.log("Form submitted with values:", values);

    navigate("/"); // Redirect to login page after successful registration
  });

  const registerText = {
    title: "Regístrate con correo electrónico",
    description:
      "Crea una cuenta para acceder a la información del clima en tiempo real.",
  };
  return (
    <AuthCard title={registerText.title} description={registerText.description}>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="w-full flex flex-col justify-around h-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputs
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>{form.formState.errors.name}</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputs type="email" placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputs
                    type="password"
                    placeholder="Contraseña"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputs
                    type="password"
                    placeholder="Confirmar contraseña"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <AuthButtons>Registrarse</AuthButtons>

          <div className="flex justify-center items-center mt-4">
            <p className="text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className=" font-medium my-element ">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}

export default Resgister;
