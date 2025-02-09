import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { userRegistrationTemplate } from "../emailTemplate/userRegistration";
import { EmailService } from "../services/emailService";

export class AuthController {
  constructor(private emailService: EmailService) {}

  public register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      res.status(400).json({ message: "Please provide all required fields" });
      return;
    }

    try {
      const existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existingUser) {
        res.status(400).json({
          message:
            existingUser.email === email
              ? "Email already registered"
              : "Username already taken",
        });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        username,
      });

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      await this.emailService.sendWelcomeEmail(name, email);
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
}
