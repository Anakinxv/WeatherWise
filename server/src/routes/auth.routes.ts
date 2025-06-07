import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import {
  CreateUserSchema,
  LoginUserSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "../schemas/auth.schema";

const router = Router();

// POST /auth/register
router.post("/register", validate(CreateUserSchema), register);
router.post("/login", validate(LoginUserSchema), login); // Assuming login uses the same schema for simplicity
router.post("/logout", logout);
router.post("/forgot-password", validate(ForgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(ResetPasswordSchema), resetPassword); // Assuming reset uses the same schema for simplicity

export default router;
