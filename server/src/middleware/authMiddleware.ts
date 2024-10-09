import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../Utilis/jwt";
import { ApiResponse } from "../Utilis/ApiResponse/apiresponse";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const payload = verifyAccessToken(token);
    req.userId = payload.userId; // Attach userId to the request
    next();
  } catch (error) {
    return ApiResponse.error(res, 401, "Invalid token", error);
  }
};
