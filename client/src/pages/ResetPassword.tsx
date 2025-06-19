import React from "react";
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
function ResetPassword() {
  const navigate = useNavigate();
  const form = useForm<resetPasswordType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "" },
  });

  const resetPasswordText = {
    title: "Restablecer contraseña",
    description:
      "Ingresa el código de verificación enviado a tu correo electrónico.",
  };

  const handleSubmit = form.handleSubmit((values: resetPasswordType) => {
    console.log("Form submitted with values:", values);
    navigate("/new-password"); // Redirect to new password page after submitting
  });
  return (
    <AuthCard
      title={resetPasswordText.title}
      description={resetPasswordText.description}
    >
      <Form {...form}>
        <form
          action=""
          className="w-full flex flex-col justify-around h-full"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-center justify-center ">
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

          <AuthButtons>Verificar código</AuthButtons>
        </form>
      </Form>
    </AuthCard>
  );
}

export default ResetPassword;
