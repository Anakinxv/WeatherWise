import z from "zod";

export const countrySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const stateSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CountryType = z.infer<typeof countrySchema>;
export type StateType = z.infer<typeof stateSchema>;
