import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { RegisterDTO, LoginDTO } from "../types/auth";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const registerDTO: RegisterDTO = req.body;

      if (
        !registerDTO.email ||
        !registerDTO.password ||
        !registerDTO.full_name
      ) {
        res.status(400).json({
          status: "error",
          message: "Los campos nombre, correo y contraseña son obligatorios.",
        });
        return;
      }

      const result = await AuthService.register(registerDTO);

      res.status(201).json({
        status: "success",
        message: "Usuario registrado con éxito.",
        data: result,
      });
    } catch (error: any) {
      res.status(400).json({
        status: "error",
        message: error.message || "Error al registrar el usuario.",
      });
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      const loginDTO: LoginDTO = req.body;

      if (!loginDTO.email || !loginDTO.password) {
        res.status(400).json({
          status: "error",
          message: "El correo y la contraseña son requeridos.",
        });
        return;
      }

      const result = await AuthService.login(loginDTO);

      res.status(200).json({
        status: "success",
        message: "Inicio de sesión exitoso.",
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        status: "error",
        message: error.message || "Error de autenticación.",
      });
    }
  }

  static async getMe(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const profile = await AuthService.getProfile(userId);

      res.status(200).json({
        status: "success",
        data: {
          id: userId,
          email: req.user.email,
          ...profile,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message || "Error al obtener datos del usuario.",
      });
    }
  }
}
