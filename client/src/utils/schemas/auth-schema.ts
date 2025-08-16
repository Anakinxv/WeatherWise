import z from "zod";

export const loginShcema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Dirección de email inválida"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  code: z
    .string({
      required_error: "Code is required",
    })
    .length(6, "Code must be exactly 6 characters long"),
});

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


// Schema actualizado para incluir profilePictureUrl
export const userSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  createdAt: z.string().datetime(),
  isverified: z.boolean(),
  lastLogin: z.string().datetime().nullable(),
  profilePictureUrl: z.string().nullable().optional(), // Nueva propiedad
});

// Schema para las preferencias del usuario
export const userPreferencesSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  temperatureUnit: z.string(),
  themeContext: z.string(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});
export const singupResponseSchema = z.object({
  user: userSchema,
  message: z.string(),
});

export const codeVerificationSchema = z.object({
  code: z.string().length(6, "El código debe tener 6 caracteres"),
  email: z.string().email("Dirección de email inválida"),
});

export const changePasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  code: z.string().length(6, "El código debe tener 6 caracteres"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
