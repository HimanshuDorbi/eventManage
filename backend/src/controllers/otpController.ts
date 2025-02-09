import { Request, Response } from "express";
import OTP from "../models/OTP";
import { EmailService } from "../services/emailService";
import crypto from "crypto";

export class OTPController {
  constructor(private emailService: EmailService) {}

  //generate an otp
  private generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  //send an otp
  public send = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
      const otp = this.generateOTP();

      await OTP.create({ email, otp });
      await this.emailService.sendOTPEmail(email, otp);
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error sending OTP" });
    }
  };

  //verify otp
  public verify = async (req: Request, res: Response): Promise<void> => {
    const { email, otp } = req.body;

    try {
      const storedOTP = await OTP.findOne({ email, otp });
      if (!storedOTP) {
        res.status(400).json({ message: "Invalid OTP" });
        return;
      }

      await OTP.deleteMany({ email });
      res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
