import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extender el tipo Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // 🔍 DEBUG: Ver qué cookies llegan
    console.log("🍪 Todas las cookies:", req.cookies);

    // Buscar tanto el token personalizado como el de AuthJS
    let token = req.cookies?.token || req.cookies?.["authjs.session-token"];

    // También buscar en diferentes formatos de nombre
    if (!token) {
      // Buscar tokens de AuthJS
      token =
        req.cookies?.["next-auth.session-token"] ||
        req.cookies?.["__Secure-next-auth.session-token"] ||
        req.cookies?.["authjs.session-token"];
    }

    console.log("🔑 Token extraído:", token ? "✅ Presente" : "❌ Ausente");
    console.log(
      "🔑 Tipo de token:",
      token ? "AuthJS/NextAuth" : "No encontrado"
    );

    if (!token) {
      console.log("❌ No hay token en cookies");
      res.status(401).json({
        success: false,
        message: "Debes iniciar sesión",
        redirect: "/login",
      });
      return;
    }

    // Si es un token de AuthJS (UUID format), manejarlo diferente
    if (token.includes("-") && token.length === 36) {
      // Es un session token de AuthJS, necesitas validarlo con tu base de datos
      console.log("🔍 Token de AuthJS detectado:", token);

      // Aquí necesitarías buscar la sesión en tu base de datos
      // Por ahora, vamos a usar un approach temporal
      res.status(401).json({
        success: false,
        message: "Token de AuthJS no soportado en este endpoint",
        redirect: "/login",
      });
      return;
    }

    // Verificar el token JWT usando jsonwebtoken directamente
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
        userId: string;
        email: string;
      };
      console.log("✅ Token JWT válido para usuario:", decoded.userId);
    } catch (error) {
      console.log("❌ Token inválido:", error);
      res.status(401).json({
        success: false,
        message: "Tu sesión ha expirado",
        redirect: "/login",
      });
      return;
    }

    // ✅ AGREGAR: Asignar la información del usuario al request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    console.log("✅ Usuario autenticado:", req.user);
    next();
  } catch (error) {
    console.error("Error al verificar token:", error);
    res.status(401).json({
      success: false,
      message: "Token inválido",
      redirect: "/login",
    });
  }
};
