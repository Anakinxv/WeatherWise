import { Request, Response } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  LoginUserInput,
  ResetPasswordInput,
  VerifyCodeInput,
} from "../schemas/auth.schema";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPasswordUser,
  resetPasswordUser,
  verifyCodeUser,
} from "../services/auth.service";
import { promise } from "zod";

export const register = async (req: Request, res: Response): Promise<void> => {
  const input: CreateUserInput = req.body;
  await registerUser(input, res);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const input: LoginUserInput = req.body; // Assuming input

  await loginUser(input, res);
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  await logoutUser(res);
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const input: ForgotPasswordInput = req.body;
  await forgotPasswordUser(input, res);
};
// Aquí deberías implementar la

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const input: ResetPasswordInput = req.body;

  await resetPasswordUser(input, res);
};

export const verifyCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  const input: VerifyCodeInput = req.body;

  await verifyCodeUser(input, res);
};
