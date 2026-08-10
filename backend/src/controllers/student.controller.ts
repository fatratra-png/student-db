import type { Request, Response } from "express";
import * as studentService from "../services/student.service.js";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.getStudentById(id);
    if (!student) {
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json({ success: true, data: newStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const updatedStudent = await studentService.updateStudent(id, req.body);
    if (!updatedStudent) {
      // ERROR FIXED: missing return caused double response
      // (404 was sent, then 200 with null data followed)
      res.status(404).json({ success: false, message: "Student not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedStudent });
  } catch (err) {
    res.status(400).json({ success: false, message: (err as Error).message });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);//////await studentService.deleteStudent(id);
    res.status(204).json({ success: true, message: "Student removed" });
  } catch (err) {
    if ((err as Error).message.toLowerCase().includes("not found")) {
      res.status(404).json({ success: false, message: (err as Error).message });
      return;
    }
    res.status(500).json({ success: false, message: (err as Error).message });
  }
};
