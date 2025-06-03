import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// esquema de respuesta de usuario (sin datos sensibles)

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
  isverified: z.boolean(),
  lastLogin: z.date().nullable(), // Hacer nullable porque puede ser null
});

// Tipos inferidos

export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export type LoginUserInput = z.infer<typeof LoginUserSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
