import jwt from "jsonwebtoken";
import { Response } from "express";

interface JwtPayload {
  userId: number;
  email: string;
}

export const generateToken = (res: Response, payload: JwtPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000, // 1 hour
  });

  return token;
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return decoded as JwtPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
