import rateLimit from "express-rate-limit";

// Rate limiter estricto para autenticación (login, registro, recuperación de contraseña)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15, // Máximo 15 intentos por IP cada 15 minutos
  standardHeaders: true, // Devuelve información del rate limit en las cabeceras `RateLimit-*`
  legacyHeaders: false, // Desactiva las cabeceras `X-RateLimit-*`
  message: {
    status: "error",
    message:
      "Demasiados intentos de acceso desde esta dirección IP. Por favor, intente de nuevo en 15 minutos.",
  },
});

// Rate limiter general para captura de leads / diagnósticos
export const leadRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Máximo 10 solicitudes por hora por IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    message:
      "Ha alcanzado el límite de solicitudes de contacto por hora. Por favor, intente más tarde.",
  },
});
