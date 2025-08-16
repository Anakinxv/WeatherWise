import { z } from "zod";

import {
  profileSchema,
  preferencesSchema,
  changePasswordSchema,
} from "@/utils/schemas/settings-schema";

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type PreferencesFormValues = z.infer<typeof preferencesSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
