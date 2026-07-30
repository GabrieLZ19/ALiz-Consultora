"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthService, LoginPayload, RegisterPayload } from "@/services/authService";

interface User {
  id: string;
  email: string;
  full_name: string;
  role: "client" | "admin";
  plan?: string;
  company_name?: string | null;
  phone?: string | null;
  avatar_url?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  loginWithOAuth: (provider: "google" | "apple") => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    const token = Cookies.get("aliz_token");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await AuthService.getMe();
      if (res.status === "success" && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
        Cookies.remove("aliz_token");
      }
    } catch {
      setUser(null);
      Cookies.remove("aliz_token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (payload: LoginPayload) => {
    setIsLoading(true);
    try {
      const res = await AuthService.login(payload);
      if (res.data?.user) {
        setUser(res.data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      const res = await AuthService.register(payload);
      if (res.data?.user) {
        setUser(res.data.user);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOAuth = async (provider: "google" | "apple") => {
    await AuthService.initiateOAuth(provider);
  };

  const logout = () => {
    setUser(null);
    AuthService.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        loginWithOAuth,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
