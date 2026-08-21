import type { Request, Response } from "express";
import app from "../src/app.js";
import { seedDatabase } from "../src/config/seed.js";

let ready: Promise<void> | null = null;

export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  ready ??= seedDatabase();
  await ready;
  app(req, res);
}
