import { Router } from "express";
import { login, refreshTokenGenerate, signup } from "../services/userService";

const router = Router();

router.post("/login", login);
router.post("/refresh-token", refreshTokenGenerate);
router.post("/signup", signup);
export default router;
