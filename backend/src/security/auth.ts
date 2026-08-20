import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "./jwt.js";
import type { PublicUser } from "../types/userTypes.js";

export interface AuthenticatedRequest extends Request {
  user?: PublicUser;
}

export const apiKeyAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.header("x-api-key") !== process.env.API_KEY) {
    res.status(401).json({ success: false, message: "Invalid or missing API key." });
    return;
  }
  next();
};

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const header = req.header("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ success: false, message: "Missing or malformed Authorization header." });
    return;
  }
  try {
    req.user = verifyToken(header.slice("Bearer ".length));
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
};
