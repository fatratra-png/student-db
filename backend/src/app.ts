import type { Express } from "express";
import cors from "cors";
import authRouter from "./controllers/authController.js";
import studentRouter from "./controllers/studentController.js";
import { apiKeyAuth, requireAuth } from "./security/auth.js";
import express from "express";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(apiKeyAuth);

app.use("/auth", authRouter);
app.use("/students", requireAuth, studentRouter);

app.get("/health", (_req, res) => {
  res.json({ message: "API alive" });
});

export default app;
