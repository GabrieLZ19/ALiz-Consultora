import { Router } from "express";
import { LeadController } from "../controllers/leadController";
import { requireAuth } from "../middleware/authMiddleware";
import { leadRateLimiter } from "../middleware/rateLimiter";

const router = Router();

// Registro público de leads (Diagnóstico / Contacto con Rate Limiting)
router.post("/", leadRateLimiter, LeadController.createLead);

// Obtener leads (Protegido para el Dashboard de Administración)
router.get("/", requireAuth, LeadController.getLeads);

export default router;
