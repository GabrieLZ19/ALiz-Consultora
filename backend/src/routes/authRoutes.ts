import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// Endpoints Públicos
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

// Endpoint Protegido (Requiere Token JWT en Header)
router.get("/me", requireAuth, AuthController.getMe);

export default router;
