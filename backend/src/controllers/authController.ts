import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { RegisterDTO, LoginDTO, OAuthSyncDTO } from "../types/auth";
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
      const errorMsg =
        error?.message ||
        (typeof error === "string" ? error : JSON.stringify(error));
      console.error("❌ Error en AuthController.register:", errorMsg, error);

      res.status(400).json({
        status: "error",
        message: errorMsg || "Error al registrar el usuario.",
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
      const errorMsg =
        error?.message ||
        (typeof error === "string" ? error : JSON.stringify(error));
      console.error("❌ Error en AuthController.login:", errorMsg, error);

      res.status(401).json({
        status: "error",
        message: errorMsg || "Error de autenticación.",
      });
    }
  }

  static async oauthSync(req: Request, res: Response): Promise<void> {
    try {
      const dto: OAuthSyncDTO = req.body;

      if (!dto.access_token) {
        res.status(400).json({
          status: "error",
          message: "El token de acceso es obligatorio.",
        });
        return;
      }

      const result = await AuthService.syncOAuthSession(dto);

      res.status(200).json({
        status: "success",
        message: "Sincronización OAuth exitosa.",
        data: result,
      });
    } catch (error: any) {
      const errorMsg =
        error?.message ||
        (typeof error === "string" ? error : JSON.stringify(error));
      console.error("❌ Error en AuthController.oauthSync:", errorMsg, error);

      res.status(401).json({
        status: "error",
        message: errorMsg || "Error al sincronizar la sesión OAuth.",
      });
    }
  }

  static async getOAuthUrl(req: Request, res: Response): Promise<void> {
    try {
      const provider = req.query.provider as "google" | "apple";
      const redirectTo = req.query.redirectTo as string | undefined;

      if (!provider || (provider !== "google" && provider !== "apple")) {
        res.status(400).json({
          status: "error",
          message: "Proveedor inválido. Debe ser 'google' o 'apple'.",
        });
        return;
      }

      const url = await AuthService.getOAuthUrl(provider, redirectTo);

      res.status(200).json({
        status: "success",
        data: { url },
      });
    } catch (error: any) {
      const errorMsg =
        error?.message ||
        (typeof error === "string" ? error : JSON.stringify(error));
      console.error("❌ Error en AuthController.getOAuthUrl:", errorMsg, error);

      res.status(500).json({
        status: "error",
        message: errorMsg || "Error al generar la URL de OAuth.",
      });
    }
  }

  static async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          status: "error",
          message: "El correo electrónico es obligatorio.",
        });
        return;
      }

      await AuthService.requestPasswordReset(email);

      res.status(200).json({
        status: "success",
        message: "Si el correo está registrado, se enviará un enlace de recuperación.",
      });
    } catch (error: any) {
      const errorMsg =
        error?.message ||
        (typeof error === "string" ? error : JSON.stringify(error));
      console.error(
        "❌ Error en AuthController.requestPasswordReset:",
        errorMsg,
        error
      );

      res.status(500).json({
        status: "error",
        message: errorMsg || "Error al solicitar la recuperación de contraseña.",
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
      const errorMsg =
        error?.message ||
        (typeof error === "string" ? error : JSON.stringify(error));
      console.error("❌ Error en AuthController.getMe:", errorMsg, error);

      res.status(500).json({
        status: "error",
        message: errorMsg || "Error al obtener datos del usuario.",
      });
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const { full_name, company_name, phone, avatar_url } = req.body;

      const updatedProfile = await AuthService.updateProfile(userId, {
        full_name,
        company_name,
        phone,
        avatar_url,
      });

      res.status(200).json({
        status: "success",
        message: "Perfil actualizado correctamente.",
        data: updatedProfile,
      });
    } catch (error: any) {
      const errorMsg = error?.message || "Error al actualizar el perfil.";
      console.error("❌ Error en AuthController.updateProfile:", errorMsg);
      res.status(400).json({
        status: "error",
        message: errorMsg,
      });
    }
  }

  static async getUserLeads(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const email = req.user.email;
      const leads = await AuthService.getUserLeads(email);

      res.status(200).json({
        status: "success",
        data: leads,
      });
    } catch (error: any) {
      const errorMsg = error?.message || "Error al obtener las solicitudes.";
      console.error("❌ Error en AuthController.getUserLeads:", errorMsg);
      res.status(500).json({
        status: "error",
        message: errorMsg,
      });
    }
  }
}

