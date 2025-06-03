import { prisma } from "../config/connectDB";
import {
  CreateUserInput,
  LoginUserInput,
  UserResponse,
} from "../schemas/auth.schema";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import { generateToken } from "../utils/jwt.utils";
import { Request, Response } from "express";

export const registerUser = async (input: CreateUserInput, res: Response) => {
  const { name, email, password } = input;

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generar un token JWT
    const token = generateToken(res, {
      userId: newUser.id,
      email: newUser.email,
    });

    // Crear respuesta usando el type UserResponse
    const userResponse: UserResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      isverified: newUser.isverified,
      lastLogin: newUser.lastLogin, // Será null inicialmente
    };

    return res.status(201).json({
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
