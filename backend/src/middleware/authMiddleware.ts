import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({
          status: "error",
          message: "Acceso no autorizado. Token faltante.",
        });
      return;
    }

    const token = authHeader.split(" ")[1];
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      res
        .status(401)
        .json({ status: "error", message: "Sesión inválida o expirada." });
      return;
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
