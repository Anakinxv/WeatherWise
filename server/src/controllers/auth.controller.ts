import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/auth.schema";
import { registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
  const input: CreateUserInput = req.body;
  await registerUser(input, res);
};
