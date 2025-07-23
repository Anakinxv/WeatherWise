import z from "zod";

export const changePersonalInfoSchema = z.object({
  profilePictureUrl: z.string().optional(),
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
});

export const changePreferencesSchema = z.object({
  temperatureUnit: z.enum(["Metric", "Imperial"]).optional(),
  themeContext: z.enum(["Light", "Dark"]).optional(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100),
    confirmNewPassword: z.string().min(8).max(100),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New password and confirmation do not match",
    path: ["confirmNewPassword"],
  });

export type ChangePersonalInfoInput = z.infer<typeof changePersonalInfoSchema>;
export type ChangePreferencesInput = z.infer<typeof changePreferencesSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
