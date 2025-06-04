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
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (input: LoginUserInput, res: Response) => {
  const { email, password } = input;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExist) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = generateToken(res, {
      userId: userExist.id,
      email: userExist.email,
    });

    await prisma.user.update({
      where: { id: userExist.id },
      data: {
        lastLogin: new Date(),
        isverified: true,
      },
    });

    const userResponse: UserResponse = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      createdAt: userExist.createdAt,
      isverified: userExist.isverified,
      lastLogin: userExist.lastLogin, // Puede ser null si nunca ha iniciado sesión
    };

    return res.status(200).json({
      user: userResponse,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
