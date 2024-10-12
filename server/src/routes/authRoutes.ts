import { Router } from "express";
import { login, refreshTokenGenerate, signup } from "../services/userService";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/refresh-token", refreshTokenGenerate);
authRoutes.post("/signup", signup);
export default authRoutes;
