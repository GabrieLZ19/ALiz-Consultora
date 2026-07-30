import { api } from "./api";
import Cookies from "js-cookie";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  company_name?: string;
  phone?: string;
}

export interface AuthApiResponse {
  status: string;
  message?: string;
  data: {
    token: string;
    user: {
      id: string;
      email: string;
      full_name: string;
      role: "client" | "admin";
    };
  };
}

export class AuthService {
  static async login(payload: LoginPayload): Promise<AuthApiResponse> {
    const response = (await api.post(
      "/auth/login",
      payload,
    )) as unknown as AuthApiResponse;

    if (response.data?.token) {
      // Guardar token y rol en cookies (expiración a 7 días)
      Cookies.set("aliz_token", response.data.token, {
        expires: 7,
        sameSite: "lax",
      });
      Cookies.set("aliz_role", response.data.user.role, {
        expires: 7,
        sameSite: "lax",
      });
    }
    return response;
  }

  static async register(payload: RegisterPayload): Promise<AuthApiResponse> {
    return (await api.post(
      "/auth/register",
      payload,
    )) as unknown as AuthApiResponse;
  }

  static async getMe(): Promise<{ status: string; data: any }> {
    return (await api.get("/auth/me")) as unknown as {
      status: string;
      data: any;
    };
  }

  static logout() {
    Cookies.remove("aliz_token");
    Cookies.remove("aliz_role");
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }
}
