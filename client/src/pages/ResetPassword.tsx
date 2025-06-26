import React, { useState, useEffect } from "react";
import AuthCard from "../components/authComponents/AuthCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import AuthButtons from "@/components/authComponents/AuthButtons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { resetPasswordSchema } from "../utils/schemas/auth-schema";
import type { resetPasswordType } from "@/types/authTypes";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAppStores";
import { Button } from "@/components/ui/button";
import { useResendTimer } from "@/hooks/useResendTimer";

function ResetPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { resetPassword } = useAuthStore((state) => state);
  const { error } = useAuthStore((state) => state);
  const email = useAuthStore((state) => state.resetEmail);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const navigate = useNavigate();
  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "" },
  });

  const resetPasswordText = {
    title: "Restablecer contraseña",
    description: email
      ? `Enviamos un código a ${email}.`
      : "Ingrese el código de verificación.",
  };

  useEffect(() => {
    if (isSubmitted && !error) {
      navigate("/new-password");
      setIsSubmitted(false);
    }
  }, [isSubmitted, error, navigate]);

  const handleSubmit = form.handleSubmit(async (values: resetPasswordType) => {
    console.log("Form submitted with values:", values);

    try {
      // Pasar un solo objeto con email y code
      if (email) {
        const success = await resetPassword({
          email: email,
          code: values.code,
        });

        if (success) {
          setIsSubmitted(true);
        }
      } else {
        console.error("Email not found in store");
        // Manejar el caso cuando no hay email
      }
    } catch (error) {
      console.error("Error during reset password:", error);
    }
  });

  const [resendSuccess, setResendSuccess] = useState(false);
  const { canResend, formattedTime, handleResend, attempts } = useResendTimer();

  const handleResendCode = async () => {
    if (!canResend) return;

    // Registrar el intento en el temporizador y obtener el resultado
    const timerResult = handleResend();

    // Solo continuar si el temporizador permite el reenvío
    if (timerResult && email) {
      try {
        const success = await forgotPassword(email);
        if (success) {
          setResendSuccess(true);
          console.log("Código reenviado exitosamente");
          setTimeout(() => {
            setResendSuccess(false);
          }, 5000);
        } else {
          console.error("Error al reenviar el código");
        }
      } catch (error) {
        console.error("Error during resend code:", error);
      }
    }
  };

  return (
    <AuthCard
      title={resetPasswordText.title}
      description={resetPasswordText.description}
    >
      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}
      <Form {...form}>
        <form
          className="w-full flex flex-col justify-around h-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-center justify-center">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      className="gap-4"
                      {...field}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="flex items-center justify-center gap-4">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-16 h-14 text-2xl border-2 border-gray-300 focus:border-primary"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  {form.formState.errors.code && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.code.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-4 flex-col">
            <div className="flex items-center justify-center gap-2">
              <p className="text-muted-foreground text-sm">
                ¿No recibiste el correo electrónico?
              </p>
              <Button
                variant="link"
                className="text-primary p-0 h-auto"
                onClick={handleResendCode}
                disabled={!canResend}
              >
                {canResend
                  ? "Haz clic para reenviarlo"
                  : `Espera ${formattedTime} para reenviar`}
              </Button>
            </div>

            {attempts > 0 && !canResend && (
              <p className="text-amber-500 text-xs mt-1">
                Intento {attempts} de reenvío. El tiempo de espera aumenta con
                cada intento.
              </p>
            )}

            <div className="w-full flex items-center justify-center">
              {resendSuccess && (
                <p className="text-green-400 text-sm font-medium animate-fade-in">
                  Correo enviado exitosamente, revisa tu bandeja de entrada.
                </p>
              )}
            </div>
          </div>

          <AuthButtons>Verificar código</AuthButtons>
        </form>
      </Form>
    </AuthCard>
  );
}

export default ResetPassword;
