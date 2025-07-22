import z from "zod";

export const profileSchema = z.object({
  profilePicture: z.string().optional(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingrese un email válido"),
});
