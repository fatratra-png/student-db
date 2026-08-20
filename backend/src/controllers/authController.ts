import { Router, type Request, type Response } from "express";
import * as authService from "../services/authService.js";
import { httpError } from "../security/errors.js";
import type { UserInput } from "../types/userTypes.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.register(req.body as UserInput);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body as UserInput);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;