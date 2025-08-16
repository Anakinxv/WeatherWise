import z from "zod";

export const profileSchema = z.object({
  profilePictureUrl: z.string().optional(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingrese un email válido"),
});

export const preferencesSchema = z.object({
  temperatureUnit: z.enum(["Metric", "Imperial"], {
    errorMap: () => ({
      message: "Seleccione una unidad de temperatura válida",
    }),
  }),
  themeContext: z.enum(["Light", "Dark"], {
    errorMap: () => ({ message: "Seleccione un tema válido" }),
  }),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "La contraseña actual es requerida"),
    newPassword: z.string().min(8, "La nueva contraseña es requerida"),
    confirmNewPassword: z
      .string()
      .min(8, "La confirmación de la nueva contraseña es requerida"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
  });
