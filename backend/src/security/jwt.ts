import jwt from "jsonwebtoken";
import type { PublicUser } from "../types/user.types.js";

export const signToken = (user: PublicUser): string => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string): PublicUser => {
  return jwt.verify(token, process.env.JWT_SECRET!) as PublicUser;
};
