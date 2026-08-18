import { Router, type Request, type Response } from "express";
import * as studentService from "../services/student.service.js";
import { httpError } from "../security/errors.js";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

const isInvalidId = (id: unknown): boolean => {
  const value = Number(id);
  return !Number.isInteger(value) || value <= 0;
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  if (isInvalidId(req.params.id)) {
    res.status(400).json({ success: false, message: "Invalid student id" });
    return;
  }
  try {
    const student = await studentService.getStudentById(Number(req.params.id));
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json({ success: true, data: newStudent });
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  if (isInvalidId(req.params.id)) {
    res.status(400).json({ success: false, message: "Invalid student id" });
    return;
  }
  try {
    const updatedStudent = await studentService.updateStudent(
      Number(req.params.id),
      req.body,
    );
    if (!updatedStudent) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  if (isInvalidId(req.params.id)) {
    res.status(400).json({ success: false, message: "Invalid student id" });
    return;
  }
  try {
    await studentService.deleteStudent(Number(req.params.id));
    res.status(204).end();
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

export const getStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await studentService.getStudentStats();
    res.status(200).json({ success: true, data: stats });
  } catch (err) {
    const { status, message } = httpError(err);
    res.status(status).json({ success: false, message });
  }
};

const router = Router();

router.get("/", getAll);
router.get("/stats", getStats);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;