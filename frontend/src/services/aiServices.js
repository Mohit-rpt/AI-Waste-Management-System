import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAIInsight = async (waste) => {
  const response = await axios.post(`${API}/ai-insight`, {
    waste,
  });

  return response.data;
};

export const sendChatMessage = async (message) => {
  const response = await axios.post(`${API}/chat`, {
    message,
  });

  return response.data;
};