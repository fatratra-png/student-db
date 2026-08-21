import type { Express } from "express";
import cors from "cors";
import authRouter from "./controllers/authController.js";
import studentRouter from "./controllers/studentController.js";
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

app.get("/", (_req, res) => {
  res.json({
    success: true,
    data: {
      name: "Student DB API",
      status: "online",
      health: "/health",
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

app.use(apiKeyAuth);

app.use("/auth", authRouter);
app.use("/students", requireAuth, studentRouter);

export default app;
