import { Request, Response } from "express";
import {
  ChangePersonalInfoInput,
  ChangePreferencesInput,
  ChangePasswordInput,
} from "../schemas/settings.schema";

import {
  changePersonalInfo as changePersonalInfoService,
  changePreferences as changePreferencesService,
  changePassword as changePasswordService,
} from "../services/settings.service";

export const changePersonalInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const input: ChangePersonalInfoInput = req.body;
  const { id } = req.params;

  await changePersonalInfoService(input, id, res);
};

export const changePreferences = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const input: ChangePreferencesInput = req.body;

  await changePreferencesService(input, id, res);
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const input: ChangePasswordInput = req.body;

  await changePasswordService(input, id, res);
};
