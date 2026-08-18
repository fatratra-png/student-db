import * as studentRepository from "../repositories/student.repository.js";
import { HttpError } from "../security/errors.js";
import { validateStudentInput } from "../security/validation.js";
import type { Student, StudentInput } from "../types/student.types.js";

const validate = (data: StudentInput): void => {
  const errors = validateStudentInput(data);
  if (errors.length > 0) {
    throw new HttpError(400, errors.join(" "));
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
  validate(data);
  try {
    return await studentRepository.create(data);
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      throw new HttpError(409, "A student with this email already exists.");
    }
    throw err;
  }
};

export const updateStudent = async (
  id: number,
  data: StudentInput,
): Promise<Student | null> => {
  validate(data);
  try {
    return await studentRepository.update(id, data);
  } catch (err) {
    if ((err as { code?: string }).code === "23505") {
      throw new HttpError(409, "A student with this email already exists.");
    }
    throw err;
  }
};

export const deleteStudent = async (id: number): Promise<void> => {
  const student = await studentRepository.findById(id);
  if (!student) {
    throw new HttpError(404, `Student with ID ${id} not found.`);
  }
  await studentRepository.remove(id);
};

export const getStudentStats = () => {
  return studentRepository.findStats();
};