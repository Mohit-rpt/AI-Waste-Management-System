import axios from "axios";

export const getApiBaseUrl = () => {
  const envUrl = (typeof import.meta !== "undefined" && import.meta.env)
    ? import.meta.env.VITE_API_URL
    : (typeof globalThis !== "undefined" && globalThis.process?.env?.VITE_API_URL);
  if (envUrl && typeof envUrl === "string" && envUrl.trim() && !envUrl.includes("undefined")) {
    return envUrl.trim().replace(/\/+$/, "");
  }
  return "http://localhost:8000";
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 25000,
});

export default api;