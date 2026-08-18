import { Router, type Request, type Response } from "express";
import * as authService from "../services/auth.service.js";
import type { UserInput } from "../types/user.types.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.register(req.body as UserInput);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: (err as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body as UserInput);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    const status = (err as Error).message.includes("required")
      ? 400
      : 401;
    res.status(status).json({ success: false, message: (err as Error).message });
  }
};

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
