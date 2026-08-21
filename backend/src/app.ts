import type { Express } from "express";
import cors from "cors";
import authRouter from "./controllers/auth.controller.js";
import studentRouter from "./controllers/student.controller.js";
import { apiKeyAuth, requireAuth } from "./security/auth.js";
import express from "express";

const app: Express = express();

const corsOrigin = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: corsOrigin ? corsOrigin.split(",").map((o) => o.trim()) : true,
  }),
);
app.use(express.json());

app.use(apiKeyAuth);

app.use("/auth", authRouter);
app.use("/students", requireAuth, studentRouter);

app.get("/health", (_req, res) => {
  res.json({ message: "API alive" });
});

export default app;
