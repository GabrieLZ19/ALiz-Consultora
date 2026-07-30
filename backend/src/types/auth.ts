export interface RegisterDTO {
  email: string;
  password: string;
  full_name: string;
  company_name?: string;
  phone?: string;
  avatar_url?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface OAuthSyncDTO {
  access_token: string;
  refresh_token?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    plan?: string;
    company_name?: string | null;
    phone?: string | null;
    avatar_url?: string | null;
  };
  token: string;
}

export interface UpdateProfileDTO {
  full_name?: string;
  company_name?: string;
  phone?: string;
  avatar_url?: string;
}
