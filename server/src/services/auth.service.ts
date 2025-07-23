import { prisma } from "../config/connectDB";
import {
  CreateUserInput,
  ForgotPasswordInput,
  LoginUserInput,
  ResetPasswordInput,
  UserResponse,
  VerifyCodeInput,
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
    const { email, code, password } = input;

    // Step 1: Find user
    let user;
    try {
      user = await prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error("Error finding user:", error);
      return res
        .status(500)
        .json({ error: "Database error when finding user" });
    }

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Step 2: Find confirmation code
    let userCode;
    try {
      userCode = await prisma.confirmationCode.findFirst({
        where: {
          userId: user.id,
          code: code,
          used: false,
          codeType: "PASSWORD_RESET",
        },
      });
    } catch (error) {
      console.error("Error finding confirmation code:", error);
      return res
        .status(500)
        .json({ error: "Database error when finding confirmation code" });
    }

    if (!userCode) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }

    // Check if code has expired
    if (userCode.expiresAt < new Date()) {
      return res.status(400).json({ error: "Code has expired" });
    }

    // Step 3: Hash password
    let newPassword;
    try {
      newPassword = await hashPassword(password);
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).json({ error: "Error creating secure password" });
    }

    // Step 4: Update user password
    try {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: newPassword,
        },
      });
    } catch (error) {
      console.error("Error updating user password:", error);
      return res
        .status(500)
        .json({ error: "Database error when updating password" });
    }

    // Step 5: Mark code as used
    try {
      await prisma.confirmationCode.update({
        where: { id: userCode.id },
        data: {
          used: true,
          code: "",
        },
      });
    } catch (error) {
      console.error("Error updating confirmation code:", error);
      // Password was updated, so don't return error to user
    }

    // Step 6: Send success email
    try {
      await passwordResetSuccessEmailSender(user.email, user.name);
    } catch (error) {
      console.error("Error sending success email:", error);
      // Password was updated, so return success with warning
      return res.status(200).json({
        message:
          "Password reset successfully, but confirmation email could not be sent",
      });
    }

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyCodeUser = async (input: VerifyCodeInput, res: Response) => {
  const { email, code } = input;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const confirmationCode = await prisma.confirmationCode.findFirst({
      where: {
        userId: user.id,
        code: code,
        used: false,
      },
    });

    if (!confirmationCode) {
      return res.status(400).json({ error: "Invalid or expired code" });
    }

    return res.status(200).json({
      message: "Code verified successfully",
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
