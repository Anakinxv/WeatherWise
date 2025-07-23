import { prisma } from "../config/connectDB";
import {
  ChangePersonalInfoInput,
  ChangePreferencesInput,
  ChangePasswordInput,
} from "../schemas/settings.schema";
import { hashPassword, comparePassword } from "../utils/hash.utils";
import { Response } from "express";
import multer from "multer";

const upload = multer();
export const changePersonalInfo = async (
  input: ChangePersonalInfoInput,
  userId: number,
  res: Response
) => {
  const { profilePictureUrl, name, email } = input;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
        email: email,
        profilePictureUrl,
      },
    });
    // Crear respuesta usando el type UserResponse
    const userResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      profilePictureUrl: updatedUser.profilePictureUrl,
    };
    // Retornar la respuesta

    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const changePreferences = async (
  input: ChangePreferencesInput,
  userId: number,
  res: Response
) => {
  const { temperatureUnit, themeContext } = input;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedPreferences = await prisma.userPreference.update({
      where: { userId: userId },
      data: {
        temperatureUnit,
        themeContext,
      },
    });
    return res.status(200).json({ user: updatedPreferences });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const changePassword = async (
  input: ChangePasswordInput,
  userId: number,
  res: Response
) => {
  const { currentPassword, newPassword } = input;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
