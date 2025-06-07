import { prisma } from "../config/connectDB";
import {
  CreateUserInput,
  ForgotPasswordInput,
  LoginUserInput,
  ResetPasswordInput,
  UserResponse,
} from "../schemas/auth.schema";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import { generateToken } from "../utils/jwt.utils";
import { Request, Response } from "express";
import {
  passwordResetEmailSender,
  welcomeEmailSender,
  passwordResetSuccessEmailSender,
} from "../mails/emailsSender";
import { generatePasswordCode } from "../utils/generatedPasswordCode";
import crypto from "crypto";

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

    welcomeEmailSender(newUser.name, newUser.email);

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

export const logoutUser = async (res: Response) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};

export const forgotPasswordUser = async (
  input: ForgotPasswordInput,
  res: Response
) => {
  const { email } = input;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExist) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Buscar código existente para este usuario
    const existingCode = await prisma.confirmationCode.findFirst({
      where: {
        userId: userExist.id,
        codeType: "PASSWORD_RESET",
        used: false,
        expiresAt: {
          gt: new Date(), // Solo códigos que no han expirado
        },
      },
    });

    let verificationCode: string;

    if (existingCode) {
      // Si ya existe un código válido, actualizarlo
      verificationCode = generatePasswordCode();

      await prisma.confirmationCode.update({
        where: { id: existingCode.id },
        data: {
          code: verificationCode,
          expiresAt: new Date(Date.now() + 3600000), // 1 hora de expiración
          createdAt: new Date(),
        },
      });
    } else {
      // Si no existe código válido, crear uno nuevo
      verificationCode = generatePasswordCode();

      await prisma.confirmationCode.create({
        data: {
          code: verificationCode,
          userId: userExist.id,
          used: false,
          expiresAt: new Date(Date.now() + 3600000), // 1 hora de expiración
          codeType: "PASSWORD_RESET",
        },
      });
    }

    await passwordResetEmailSender(
      userExist.email,
      userExist.name,
      verificationCode
    );

    return res.status(200).json({
      message: "Password reset code sent to your email",
      code: verificationCode,
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPasswordUser = async (
  input: ResetPasswordInput,
  res: Response
) => {
  try {
    const { code, password } = input;

    const userCode = await prisma.confirmationCode.findFirst({
      where: { code, codeType: "PASSWORD_RESET", used: false },
    });

    if (!userCode) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }
    // Verificar si el código ha expirado
    if (userCode.expiresAt < new Date()) {
      return res.status(400).json({ error: "Code has expired" });
    }

    // Hash la nueva contraseña
    const newPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: userCode.userId },

      data: {
        password: newPassword,
      },
    });

    await prisma.confirmationCode.update({
      where: { id: userCode.id },

      data: {
        code: "",
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userCode.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Enviar correo de éxito
    passwordResetSuccessEmailSender(user.email, user.name);

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
