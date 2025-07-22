import { z } from "zod";

import { profileSchema } from "@/utils/schemas/settings-schema";

export type ProfileFormValues = z.infer<typeof profileSchema>;
