import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();

//user profile routes
router.get("/profile", authMiddleware, userController.getProfile);

export default router;
