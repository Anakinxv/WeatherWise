import React, { useState } from "react"; // Quitamos useEffect ya que manejaremos esto de otra manera
import AuthCard from "../components/authComponents/AuthCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../utils/schemas/auth-schema";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import AuthInputs from "../components/authComponents/AuthInputs";
import AuthButtons from "../components/authComponents/AuthButtons";
import { useNavigate, Link } from "react-router-dom";
import type { registerType } from "@/types/authTypes";
import { useAuthStore } from "@/store/useAppStores";

function Resgister() {
  const error = useAuthStore((state) => state.error);
  const signup = useAuthStore((state) => state.signup);
  const navigate = useNavigate();

  // Estado local para controlar el formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<registerType>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onBlur", // Muestra errores después de que el campo pierde el foco
  });
  console.log("Form values:", error);

  const onSubmit = form.handleSubmit(async (values: registerType) => {
    if (isSubmitting) return; // Prevenir envíos múltiples

    setIsSubmitting(true);

    try {
      // Limpiar errores anteriores
      useAuthStore.setState({ error: null });

      // Esperar a que termine el registro
      await signup(values);

      // Verificar si hay error después de la operación
      const currentError = useAuthStore.getState().error;

      if (!currentError) {
        // Solo redirigir si no hay error
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Mostrar error global de la API si existe */}
          {error && (
            <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInputs type="text" placeholder="Nombre" {...field} />
                </FormControl>
                {form.formState.errors.name && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.name.message}
                  </FormMessage>
                )}
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
                {form.formState.errors.email && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.email.message}
                  </FormMessage>
                )}
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
                {form.formState.errors.password && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.password.message}
                  </FormMessage>
                )}
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
                {form.formState.errors.confirmPassword && (
                  <FormMessage className="text-red-500">
                    {form.formState.errors.confirmPassword.message}
                  </FormMessage>
                )}
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
