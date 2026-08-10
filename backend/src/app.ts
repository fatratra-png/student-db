import type { Express } from "express";
import cors from "cors";
import * as studentController from "./controllers/student.controller.js";
import express from "express";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/students", studentController.getAll);
app.get("/students/:id", studentController.getOne);
app.post("/students", studentController.create);
app.put("/students/:id", studentController.update);
app.delete("/students/:id", studentController.remove);

export default app;
