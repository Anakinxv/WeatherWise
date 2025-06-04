import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema, LoginUserSchema } from "../schemas/auth.schema";

const router = Router();

// POST /auth/register
router.post("/register", validate(CreateUserSchema), register);
router.post("/login", validate(LoginUserSchema), login); // Assuming login uses the same schema for simplicity

export default router;
