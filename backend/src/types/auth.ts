export interface RegisterDTO {
  email: string;
  password: string;
  full_name: string;
  company_name?: string;
  phone?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
  };
  token: string;
}
