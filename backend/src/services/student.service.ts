import * as studentRepository from "../repositories/student.repository.js";
import type { Student, StudentInput } from "../types/student.types.js";
import { validateStudentInput } from "../security/validation.js";

const ensureValidInput = (data: StudentInput): void => {
  const errors = validateStudentInput(data);
  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
};

export const getAllStudents = async (): Promise<Student[]> => {
  return studentRepository.findAll();
};

export const getStudentById = async (id: number): Promise<Student | null> => {
  return studentRepository.findById(id);
};

export const createStudent = async (
  data: StudentInput,
): Promise<Student | null> => {
  ensureValidInput(data);
  return studentRepository.create(data);
};

export const updateStudent = async (
  id: number,
  data: StudentInput,
): Promise<Student | null> => {
  ensureValidInput(data);
  return studentRepository.update(id, data);
};

export const deleteStudent = async (id: number): Promise<void> => {
  const existingStudent = await studentRepository.findById(id);
  if (!existingStudent) {
    throw new Error(`Student with ID ${id} not found.`);
  }
  await studentRepository.remove(id);
};

export const getStudentStats = async () => {
  return studentRepository.findStats();
};
