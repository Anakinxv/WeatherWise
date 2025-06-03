import { Router } from "express";
import { register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { CreateUserSchema } from "../schemas/auth.schema";

const router = Router();

// POST /auth/register
router.post("/register", validate(CreateUserSchema), register);

export default router;
