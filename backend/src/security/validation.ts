import type { StudentInput } from "../types/student.types.js";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/;
const MAX_NAME_LENGTH = 100;
const MAX_AGE = 150;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validateStudentInput = (data: StudentInput): string[] => {
  const errors: string[] = [];
  const { first_name, last_name, email, age } = data;

  if (typeof first_name !== "string" || !first_name.trim()) {
    errors.push("First name is required.");
  } else if (
    first_name.trim().length > MAX_NAME_LENGTH ||
    !NAME_REGEX.test(first_name.trim())
  ) {
    errors.push(`First name must be ${MAX_NAME_LENGTH} characters or fewer, letters only.`);
  }

  if (typeof last_name !== "string" || !last_name.trim()) {
    errors.push("Last name is required.");
  } else if (
    last_name.trim().length > MAX_NAME_LENGTH ||
    !NAME_REGEX.test(last_name.trim())
  ) {
    errors.push(`Last name must be ${MAX_NAME_LENGTH} characters or fewer, letters only.`);
  }

  if (typeof email !== "string" || !email.trim()) {
    errors.push("Email is required.");
  } else if (!isValidEmail(email.trim())) {
    errors.push("Email does not look valid.");
  }

  if (age != null) {
    const value = Number(age);
    if (!Number.isInteger(value) || value <= 0 || value > MAX_AGE) {
      errors.push(`Age must be a whole number between 1 and ${MAX_AGE}.`);
    }
  }

  return errors;
};

export const validateCredentials = (data: {
  email?: unknown;
  password?: unknown;
}): string[] => {
  const errors: string[] = [];

  if (typeof data.email !== "string" || !data.email.trim()) {
    errors.push("Email is required.");
  } else if (!isValidEmail(data.email.trim())) {
    errors.push("Email does not look valid.");
  }

  if (typeof data.password !== "string" || !data.password) {
    errors.push("Password is required.");
  } else if (data.password.length < 8) {
    errors.push("Password must be at least 8 characters.");
  }

  return errors;
};