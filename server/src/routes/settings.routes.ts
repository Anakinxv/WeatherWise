import { Router } from "express";
import { validate } from "../middlewares/validate";
import { requireAuth } from "../middlewares/requireAuth";
import {
  changePersonalInfoSchema,
  changePreferencesSchema,
  changePasswordSchema,
} from "../schemas/settings.schema";
import {
  changePersonalInfo,
  changePreferences,
  changePassword,
} from "../controllers/settings.controller";

const router = Router();

// Aplicar autenticación a todas las rutas
router.use(requireAuth);

router.patch(
  "/profile",
  validate(changePersonalInfoSchema),
  changePersonalInfo
);
router.patch(
  "/preferences",
  validate(changePreferencesSchema),
  changePreferences
);
router.patch("/password", validate(changePasswordSchema), changePassword);

export default router;
