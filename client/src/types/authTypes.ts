import z from "zod";
import { loginShcema, registerSchema } from "../utils/schemas/auth-schema";

export type loginType = z.infer<typeof loginShcema>;
export type registerType = z.infer<typeof registerSchema>;
