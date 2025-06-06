import { sendEmail } from "./emailService";
import {
  WELCOME_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailsTemplates";

export const welcomeEmailSender = async (
  userName: string,
  userEmail: string
) => {
  try {
    return await sendEmail({
      to: userEmail,
      subject: "¡Bienvenido a WeatherWise!",
      html: WELCOME_TEMPLATE(userName),
    });
  } catch (error) {
    console.error("❌ Error al enviar el correo de bienvenida:", error);
    return { success: false, error };
  }
};

export const passwordResetEmailSender = async (
  userEmail: string,
  userName: string,
  verificationCode: string
) => {
  try {
    return await sendEmail({
      to: userEmail,
      subject: "🔐 Restablece tu contraseña - WeatherWise",
      html: PASSWORD_RESET_REQUEST_TEMPLATE(userName, verificationCode),
    });
  } catch (error) {
    console.error("❌ Error al enviar el correo de restablecimiento:", error);
    return { success: false, error };
  }
};
