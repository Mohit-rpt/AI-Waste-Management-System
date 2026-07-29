import axios from "axios";

const API = "http://127.0.0.1:8000";

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