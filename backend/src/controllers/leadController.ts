import { Request, Response } from "express";
import { LeadService } from "../services/leadService";
import { CreateLeadDTO } from "../types/lead";

export class LeadController {
  static async createLead(req: Request, res: Response): Promise<void> {
    try {
      const leadDTO: CreateLeadDTO = req.body;

      // Validaciones básicas de entrada
      if (
        !leadDTO.full_name ||
        !leadDTO.email ||
        !leadDTO.message ||
        !leadDTO.service_interest
      ) {
        res.status(400).json({
          status: "error",
          message:
            "Los campos nombre, correo, servicio de interés y mensaje son obligatorios.",
        });
        return;
      }

      const newLead = await LeadService.createLead(leadDTO);

      res.status(201).json({
        status: "success",
        message: "Diagnóstico/solicitud registrada con éxito.",
        data: newLead,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message:
          error.message || "Error interno del servidor al procesar el lead.",
      });
    }
  }

  static async getLeads(req: Request, res: Response): Promise<void> {
    try {
      const leads = await LeadService.getAllLeads();
      res.status(200).json({
        status: "success",
        data: leads,
      });
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message || "Error al recuperar los leads.",
      });
    }
  }
}
