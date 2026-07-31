import { z } from "zod";

// Esquema de validación para registro de usuario
export const RegisterSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
  full_name: z
    .string()
    .min(2, "El nombre completo debe tener al menos 2 caracteres")
    .optional(),
  phone: z.string().optional(),
});

// Esquema de validación para inicio de sesión
export const LoginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

// Esquema de validación para solicitud de reseteo de contraseña
export const RequestPasswordResetSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

// Esquema de validación para confirmación de reseteo de contraseña
export const ResetPasswordSchema = z.object({
  token: z.string().min(1, "El token de recuperación es requerido"),
  new_password: z
    .string()
    .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
});

// Esquema de validación para actualización de perfil
export const UpdateProfileSchema = z.object({
  full_name: z.string().optional(),
  company_name: z.string().optional(),
  phone: z.string().optional(),
  avatar_url: z.string().optional(),
});

// Esquema de validación para captura de Leads
export const LeadSchema = z.object({
  full_name: z.string().min(2, "El nombre completo es requerido"),
  email: z.string().email("Correo electrónico inválido"),
  phone: z.string().optional(),
  company_name: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().optional(),
  diagnostic_answers: z.record(z.string(), z.any()).optional(),
});
