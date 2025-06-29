import z from "zod";

export const states = z.object({
  name: z.string(),
  state_code: z.string(),
});
