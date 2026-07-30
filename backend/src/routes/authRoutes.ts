import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

// Endpoints Públicos
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/oauth-sync", AuthController.oauthSync);
router.get("/oauth-url", AuthController.getOAuthUrl);
router.post("/request-password-reset", AuthController.requestPasswordReset);

// Endpoints Protegidos (Requieren Token JWT en Header)
router.get("/me", requireAuth, AuthController.getMe);
router.put("/profile", requireAuth, AuthController.updateProfile);
router.get("/my-leads", requireAuth, AuthController.getUserLeads);

export default router;
