import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

    // Si no hay token, redirigir al login
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Debes iniciar sesión",
        redirect: "/login",
      });
      return;
    }

    // Verificar si el token es válido
    const decoded = verifyToken(token);

    // Si el token no es válido, redirigir al login
    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Tu sesión ha expirado",
        redirect: "/login",
      });
      return;
    }

    // Si todo está bien, continuar a la siguiente función
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token inválido",
      redirect: "/login",
    });
  }
};
