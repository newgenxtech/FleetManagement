import { Router } from "express";
import { loginController, refreshTokenController, logoutController,signupController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", authMiddleware, logoutController);  // Protected by authMiddleware
router.post("/signup", signupController);  
export default router;
