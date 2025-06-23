import z from "zod";
import {
  loginShcema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  userSchema,
  singupResponseSchema,
} from "../utils/schemas/auth-schema";

export type loginType = z.infer<typeof loginShcema>;
export type registerType = z.infer<typeof registerSchema>;
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
export type userType = z.infer<typeof userSchema>;

// Tipo para el API (sin confirmPassword)
export type RegisterAPIType = Omit<
  z.infer<typeof registerSchema>,
  "confirmPassword"
>;

export type AuthResponseType = z.infer<typeof singupResponseSchema>;
