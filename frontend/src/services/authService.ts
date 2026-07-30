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
  avatar_url?: string;
}

export interface UpdateProfilePayload {
  full_name?: string;
  company_name?: string;
  phone?: string;
  avatar_url?: string;
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
      plan?: string;
      company_name?: string | null;
      phone?: string | null;
      avatar_url?: string | null;
    };
  };
}

export class AuthService {
  static async login(payload: LoginPayload): Promise<AuthApiResponse> {
    const response = (await api.post(
      "/auth/login",
      payload
    )) as unknown as AuthApiResponse;

    if (response.data?.token) {
      this.saveSession(response.data.token, response.data.user.role);
    }
    return response;
  }

  static async register(payload: RegisterPayload): Promise<AuthApiResponse> {
    const response = (await api.post(
      "/auth/register",
      payload
    )) as unknown as AuthApiResponse;

    if (response.data?.token) {
      this.saveSession(response.data.token, response.data.user.role);
    }
    return response;
  }

  static async initiateOAuth(provider: "google" = "google"): Promise<void> {
    const redirectUrl = typeof window !== "undefined"
      ? `${window.location.origin}/login/callback`
      : "";
    const response = (await api.get(
      `/auth/oauth-url?provider=google&redirectTo=${encodeURIComponent(redirectUrl)}`
    )) as unknown as { status: string; data: { url: string } };

    if (response.data?.url) {
      window.location.href = response.data.url;
    } else {
      throw new Error("No se pudo iniciar el flujo de autenticación con Google.");
    }
  }

  static async syncOAuthSession(accessToken: string): Promise<AuthApiResponse> {
    const response = (await api.post("/auth/oauth-sync", {
      access_token: accessToken,
    })) as unknown as AuthApiResponse;

    if (response.data?.token) {
      this.saveSession(response.data.token, response.data.user.role);
    }
    return response;
  }

  static async updateProfile(payload: UpdateProfilePayload): Promise<{ status: string; message: string; data: any }> {
    return (await api.put("/auth/profile", payload)) as unknown as {
      status: string;
      message: string;
      data: any;
    };
  }

  static async getUserLeads(): Promise<{ status: string; data: any[] }> {
    return (await api.get("/auth/my-leads")) as unknown as {
      status: string;
      data: any[];
    };
  }

  static async requestPasswordReset(email: string): Promise<{ status: string; message: string }> {
    return (await api.post("/auth/request-password-reset", {
      email,
    })) as unknown as { status: string; message: string };
  }

  static async getMe(): Promise<{ status: string; data: any }> {
    return (await api.get("/auth/me")) as unknown as {
      status: string;
      data: any;
    };
  }

  static saveSession(token: string, role: string) {
    Cookies.set("aliz_token", token, {
      expires: 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    Cookies.set("aliz_role", role, {
      expires: 7,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  static logout() {
    Cookies.remove("aliz_token");
    Cookies.remove("aliz_role");
  }
}
