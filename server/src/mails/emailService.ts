// emailService.ts
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || "");

type SendEmailParams = {
  to: string | string[]; // puede ser una persona o varias
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: "WeatherWise <onboarding@resend.dev>", // Usar el dominio por defecto de Resend
      to,
      subject,
      html,
    });

    if (error) {
      console.error("❌ Error al enviar el correo:", error);
      return { success: false, error };
    }

    console.log("✅ Correo enviado con éxito:", data);
    return { success: true, data };
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    return { success: false, error: err };
  }
}
