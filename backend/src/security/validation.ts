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

  if (!first_name || typeof first_name !== "string" || !first_name.trim()) {
    errors.push("first_name is required.");
  } else if (
    first_name.trim().length > MAX_NAME_LENGTH ||
    !NAME_REGEX.test(first_name.trim())
  ) {
    errors.push("first_name is invalid.");
  }

  if (!last_name || typeof last_name !== "string" || !last_name.trim()) {
    errors.push("last_name is required.");
  } else if (
    last_name.trim().length > MAX_NAME_LENGTH ||
    !NAME_REGEX.test(last_name.trim())
  ) {
    errors.push("last_name is invalid.");
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.push("email is required.");
  } else if (!isValidEmail(email.trim())) {
    errors.push("email is not a valid email address.");
  }

  if (age !== undefined && age !== null) {
    const ageNumber = Number(age);
    if (!Number.isInteger(ageNumber) || ageNumber <= 0 || ageNumber > MAX_AGE) {
      errors.push(`age must be an integer between 1 and ${MAX_AGE}.`);
    }
  }

  return errors;
};

export const validateCredentials = (data: {
  email?: unknown;
  password?: unknown;
}): string[] => {
  const errors: string[] = [];

  if (!data.email || typeof data.email !== "string") {
    errors.push("email is required.");
  } else if (!isValidEmail(data.email.trim())) {
    errors.push("email is not a valid email address.");
  }

  if (!data.password || typeof data.password !== "string") {
    errors.push("password is required.");
  } else if (data.password.length < 8) {
    errors.push("password must be at least 8 characters.");
  }

  return errors;
};
