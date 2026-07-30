import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para inyectar JWT Token desde Cookies
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("aliz_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor de respuesta desempacando .data
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      "Error al procesar la solicitud en el servidor.";
    return Promise.reject(new Error(message));
  },
);
