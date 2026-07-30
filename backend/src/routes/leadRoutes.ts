import { Router } from "express";
import { LeadController } from "../controllers/leadController";
// En el futuro, getLeads usará el middleware requireAuth para que solo el Admin lo vea
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// Registro público de leads (Diagnóstico / Contacto)
router.post("/", LeadController.createLead);

// Obtener leads (Protegido para el Dashboard de Administración)
router.get("/", requireAuth, LeadController.getLeads);

export default router;
