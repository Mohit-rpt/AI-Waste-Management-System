import api from "../api/axios.js";

/**
 * Formats an Axios error into a clear, user-facing error message.
 */
export const formatErrorMessage = (error) => {
  if (!error) return "An unknown error occurred. Please try again.";

  // Request timed out (client-side or server timeout)
  if (error.code === "ECONNABORTED" || error.message?.toLowerCase().includes("timeout")) {
    return "Request timed out. The AI service is taking longer than expected. Please try again.";
  }

  // Response received from server with structured error detail
  if (error.response) {
    const status = error.response.status;
    const detail = error.response.data?.detail;

    if (detail && typeof detail === "string") {
      return detail;
    }

    if (status === 400) {
      return "Invalid request. Please check your message.";
    }
    if (status === 401 || status === 403) {
      return "Authentication failed. The server's Gemini API key may be invalid.";
    }
    if (status === 429) {
      return "Gemini API rate limit or quota exceeded. Please wait a moment and try again.";
    }
    if (status === 503) {
      return "The AI service is currently unavailable or API key is not configured.";
    }
    if (status === 504) {
      return "The server timed out waiting for the AI response. Please try again.";
    }
    return `Server error (${status}). Please try again later.`;
  }

  // Network failure / cannot connect to backend
  if (error.request) {
    return "Unable to reach the backend server. Please verify the server is running.";
  }

  return error.message || "An unexpected error occurred.";
};

export const getAIInsight = async (waste) => {
  if (!waste || !String(waste).trim()) {
    throw new Error("Waste type cannot be empty.");
  }
  try {
    const response = await api.post("/ai-insight", {
      waste: String(waste).trim(),
    });
    return response.data;
  } catch (error) {
    throw new Error(formatErrorMessage(error), { cause: error });
  }
};

export const sendChatMessage = async (message) => {
  if (!message || !String(message).trim()) {
    throw new Error("Message cannot be empty.");
  }
  try {
    const response = await api.post("/chat", {
      message: String(message).trim(),
    });

    if (!response.data || typeof response.data.reply !== "string") {
      throw new Error("Received an unexpected response format from the server.");
    }

    return response.data;
  } catch (error) {
    if (error.response || error.code || error.request) {
      throw new Error(formatErrorMessage(error), { cause: error });
    }
    throw error;
  }
};