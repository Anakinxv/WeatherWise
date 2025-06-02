import { prisma } from "../config/connectDB";
import { CreateUserInput, LoginUserInput } from "../schemas/auth.schema";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import { generateToken } from "../utils/jwt.utils";
