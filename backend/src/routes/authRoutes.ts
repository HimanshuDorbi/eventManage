import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { EmailService } from "../services/emailService";

const router = Router();
const emailService = new EmailService();
const authController = new AuthController(emailService);

//auth routes
router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;