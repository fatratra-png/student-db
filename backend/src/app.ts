import type { Express } from "express";
import cors from "cors";
import studentRouter from "./controllers/student.controller.js";
import express from "express";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRouter);

app.get("/", (_req, res) => {
  res.json({ message: "API alive" });
});

export default app;
