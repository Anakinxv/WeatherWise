import axios from "axios";
import type { ProfileFormValues } from "@/types/settingsTypes";

const API_URL = "http://localhost:3000/api/settings";

export const changePersonalInfo = async (input: ProfileFormValues) => {
    try {
      const payload = {
        name: input.name,
        email: input.email,
        profilePictureUrl: input.profilePictureUrl,
      };

      console.log(payload)
  
      const response = await axios.patch(`${API_URL}/profile`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Envia cookies automáticamente (incluyendo JWT si es HttpOnly)
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating personal info:", error);
  
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || "Failed to update profile");
      }
  
      throw error;
    }
  };
