import z from "zod";
import {
  loginShcema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../utils/schemas/auth-schema";

export type loginType = z.infer<typeof loginShcema>;
export type registerType = z.infer<typeof registerSchema>;
export type forgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
