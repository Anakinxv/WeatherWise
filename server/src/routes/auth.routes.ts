import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import {
  CreateUserSchema,
  LoginUserSchema,
  ForgotPasswordSchema,
} from "../schemas/auth.schema";

const router = Router();

// POST /auth/register
router.post("/register", validate(CreateUserSchema), register);
router.post("/login", validate(LoginUserSchema), login); // Assuming login uses the same schema for simplicity
router.post("/logout", logout);
router.post("/forgot-password", validate(ForgotPasswordSchema), forgotPassword);

export default router;
