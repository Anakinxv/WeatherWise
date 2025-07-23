import { prisma } from "../config/connectDB";
import {
  ChangePersonalInfoInput,
  ChangePreferencesInput,
  ChangePasswordInput,
} from "../schemas/settings.schema";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import { Response } from "express";

export const changePersonalInfo = async (
  input: ChangePersonalInfoInput,
  userId: string,
  res: Response
) => {};

export const changePreferences = async (
  input: ChangePreferencesInput,
  userId: string,
  res: Response
) => {};

export const changePassword = async (
  input: ChangePasswordInput,
  userId: string,
  res: Response
) => {};
