import axios from "axios";
import type {
  RegisterAPIType,
  loginType,
  AuthResponseType,
  CodeVerificationType,
  ChangePasswordType,
} from "../types/authTypes";
import { singupResponseSchema } from "../utils/schemas/auth-schema";

const API_URL = "http://localhost:3000/api/auth";

export const singupService = async (
  data: RegisterAPIType
): Promise<AuthResponseType> => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);

    // Parse response.data, not the entire axios response object
    const parsedData = singupResponseSchema.safeParse(response.data);

    if (!parsedData.success) {
      throw new Error("Formato de respuesta inválido");
    }

    return parsedData.data;
  } catch (error: string | any) {
    // Propagar el error para que lo maneje el slice
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || "Error desconocido");
  }
};

export const loginService = async (
  data: loginType
): Promise<AuthResponseType> => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);

    const parsedData = singupResponseSchema.safeParse(response.data);
    if (!parsedData.success) {
      throw new Error("Formato de respuesta inválido");
    }

    return parsedData.data;
  } catch (error: string | any) {
    // Propagar el error para que lo maneje el slice
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || "Error desconocido");
  }
};

export const forgotPasswordService = async (
  email: string
): Promise<boolean> => {
  try {
    await axios.post(`${API_URL}/forgot-password`, { email });
    return true;
  } catch (error: string | any) {
    // Propagar el error para que lo maneje el slice
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 400) {
      throw new Error("Correo electrónico no válido o no encontrado");
    } else {
      throw new Error("Error al enviar el correo de recuperación");
    }
  }
};

export const resetPasswordService = async (
  data: CodeVerificationType
): Promise<boolean> => {
  try {
    await axios.post(`${API_URL}/verify-code`, data);

    return true;
  } catch (error: string | any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.response?.status === 400) {
      throw new Error("Codigo no válido o no encontrado");
    } else {
      throw new Error("Error al enviar el correo de recuperación");
    }
  }
};

export const changePasswordService = async (
  data: ChangePasswordType
): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, data);
    if (response.status !== 200) {
      throw new Error("Error al cambiar la contraseña");
    }
    return true;
  } catch (error: string | any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al cambiar la contraseña");
  }
};

export const logoutService = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error: string | any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Error al cerrar sesión");
  }
};
