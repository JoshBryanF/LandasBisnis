// src/api/useCreateFeedback.ts
import { axiosInstance } from "../lib/axiosInstance";

export const useCreateFeedback = () => {
  const createFeedback = async (data: {
    topic: string;
    category: string;
    message: string;
  }) => {
    try {
      const response = await axiosInstance.post("/contact-message", data);
      return response.data;
    } catch (error: any) {
      console.error("Failed to submit feedback:", error);
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };

  return { createFeedback };
};
