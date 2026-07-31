import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { requireAuth } from "../middleware/authMiddleware";
import { authRateLimiter } from "../middleware/rateLimiter";

const router = Router();

// Endpoints Públicos (Protegidos con Rate Limiting)
router.post("/register", authRateLimiter, AuthController.register);
router.post("/login", authRateLimiter, AuthController.login);
router.post("/oauth-sync", authRateLimiter, AuthController.oauthSync);
router.get("/oauth-url", AuthController.getOAuthUrl);
router.post("/request-password-reset", authRateLimiter, AuthController.requestPasswordReset);
router.post("/reset-password", authRateLimiter, AuthController.resetPassword);

// Endpoints Protegidos (Requieren Token JWT en Header)
router.get("/me", requireAuth, AuthController.getMe);
router.put("/profile", requireAuth, AuthController.updateProfile);
router.get("/my-leads", requireAuth, AuthController.getUserLeads);

export default router;
