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
  userId: string, // 🔄 Cambiar de number a string
  res: Response
) => {
  const { name, email, profilePictureUrl } = input;

  try {
    // 🔄 Convertir string a number para Prisma
    const userIdNumber = parseInt(userId);

    const user = await prisma.user.findUnique({
      where: { id: userIdNumber },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    3;

    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    // Prepare update data
    const updateData: any = {};

    if (name !== undefined && name !== null && name.trim() !== "") {
      updateData.name = name.trim();
    }

    if (email !== undefined && email !== null && email.trim() !== "") {
      updateData.email = email.trim();
    }

    if (
      profilePictureUrl !== undefined &&
      profilePictureUrl !== null &&
      profilePictureUrl.trim() !== ""
    ) {
      updateData.profilePictureUrl = profilePictureUrl.trim();
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "No changes provided" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userIdNumber }, // Usar userIdNumber
      data: updateData,
    });

    const userResponse = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePictureUrl: updatedUser.profilePictureUrl,
      createdAt: updatedUser.createdAt,
      isverified: updatedUser.isverified,
      lastLogin: updatedUser.lastLogin,
    };

    return res.status(200).json({
      user: userResponse,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating personal info:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const changePreferences = async (
  input: ChangePreferencesInput,
  userId: string, // 🔄 Cambiar de number a string
  res: Response
) => {
  const { temperatureUnit, themeContext } = input;

  try {
    const userIdNumber = parseInt(userId); // 🔄 Convertir a number

    const user = await prisma.user.findUnique({
      where: { id: userIdNumber },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if preferences exist, if not create them
    let userPreferences = await prisma.userPreference.findUnique({
      where: { userId: userIdNumber }, // Usar userIdNumber
    });

    if (!userPreferences) {
      userPreferences = await prisma.userPreference.create({
        data: {
          userId: userIdNumber, // Usar userIdNumber
          temperatureUnit: temperatureUnit || "CELSIUS",
          themeContext: themeContext || "LIGHT",
        },
      });
    } else {
      userPreferences = await prisma.userPreference.update({
        where: { userId: userIdNumber }, // Usar userIdNumber
        data: {
          ...(temperatureUnit && { temperatureUnit }),
          ...(themeContext && { themeContext }),
        },
      });
    }

    return res.status(200).json({
      preferences: userPreferences,
      message: "Preferences updated successfully",
    });
  } catch (error) {
    console.error("Error updating preferences:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const changePassword = async (
  input: ChangePasswordInput,
  userId: string, // 🔄 Cambiar de number a string
  res: Response
) => {
  const { currentPassword, newPassword } = input;

  try {
    const userIdNumber = parseInt(userId); // 🔄 Convertir a number

    const user = await prisma.user.findUnique({
      where: { id: userIdNumber },
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

    // Validate new password strength (optional)
    if (newPassword.length < 6) {
      return res.status(400).json({
        error: "New password must be at least 6 characters long",
      });
    }

    const hashedNewPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userIdNumber }, // Usar userIdNumber
      data: {
        password: hashedNewPassword,
      },
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
