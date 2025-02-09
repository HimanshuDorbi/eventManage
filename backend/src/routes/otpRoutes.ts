import { Router } from "express";
import { OTPController } from "../controllers/otpController";
import { EmailService } from "../services/emailService";

const router = Router();
const emailService = new EmailService();
const otpController = new OTPController(emailService);


//otp routes
router.post("/send-otp", otpController.send);
router.post("/verify-otp", otpController.verify);

export default router;