import * as userRepository from "../repositories/user.repository.js";
import { hashPassword, comparePassword } from "../security/password.js";
import { signToken } from "../security/jwt.js";
import { validateCredentials } from "../security/validation.js";
import type { PublicUser, User, UserInput } from "../types/user.types.js";

const toPublicUser = (user: User): PublicUser => {
  const { id, email, created_at } = user;
  return { id, email, created_at };
};

export const register = async (
  data: UserInput,
): Promise<{ user: PublicUser; token: string }> => {
  const errors = validateCredentials(data);
  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
  const email = data.email.trim().toLowerCase();
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new Error("An account with this email already exists.");
  }
  const user = await userRepository.create({
    email,
    password: await hashPassword(data.password),
  });
  const publicUser = toPublicUser(user);
  return { user: publicUser, token: signToken(publicUser) };
};

export const login = async (
  data: UserInput,
): Promise<{ user: PublicUser; token: string }> => {
  const errors = validateCredentials(data);
  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
  const email = data.email.trim().toLowerCase();
  const user = await userRepository.findByEmail(email);
  if (!user || !(await comparePassword(data.password, user.password_hash))) {
    throw new Error("Invalid email or password.");
  }
  const publicUser = toPublicUser(user);
  return { user: publicUser, token: signToken(publicUser) };
};
