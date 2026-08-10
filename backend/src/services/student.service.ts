import * as studentRepository from "../repositories/student.repository.js";
import type { Student, StudentInput } from "../types/student.types.js";

const validateStudentInput = (data: StudentInput): void => {
  const { first_name, last_name, email, age } = data;
  if (!first_name || !last_name || !email) {
    throw new Error(
      "Missing required fields: first_name, last_name, and email are required.",
    );
  }
  if (age !== undefined && age !== null && age <= 0) {
    throw new Error("Invalid age: Age must be a positive number.");
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
  validateStudentInput(data);
  return studentRepository.create(data);
};

export const updateStudent = async (
  id: number,
  data: StudentInput,
): Promise<Student | null> => {
  validateStudentInput(data);
  return studentRepository.update(id, data);
};

export const deleteStudent = async (id: number): Promise<void> => {
  const existingStudent = await studentRepository.findById(id);
  if (!existingStudent) {
    throw new Error(`Student with ID ${id} not found.`);
  }
  await studentRepository.remove(id);
};
