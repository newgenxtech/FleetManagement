import { Request, Response } from "express";
import { login, refreshToken, logout, signup } from "../services/userService";

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken,userdetials } = await login(email, password);
        res.json({ accessToken, refreshToken,userdetials });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        const newAccessToken = await refreshToken(refreshToken);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const logoutController = async (req: Request, res: Response) => {
    const userId = req.userId; // Extracted from middleware
    await logout(userId);
    res.json({ message: 'Logged out successfully' });
};
export const signupController = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName,age } = req.body;
        const { accessToken, refreshToken,userdetials } = await signup(email, password, firstName, lastName,age);
        res.status(201).json({ accessToken, refreshToken,userdetials });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};