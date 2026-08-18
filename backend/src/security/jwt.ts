import jwt from "jsonwebtoken";
import type { PublicUser } from "../types/user.types.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const signToken = (user: PublicUser): string =>
  jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (token: string): PublicUser =>
  jwt.verify(token, JWT_SECRET) as PublicUser;