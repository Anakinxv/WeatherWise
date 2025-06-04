import { Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schemas/auth.schema";
import { loginUser, registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  const input: CreateUserInput = req.body;
  await registerUser(input, res);
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const input: LoginUserInput = req.body; // Assuming input

  await loginUser(input, res);
};
