import * as userRepository from "../repositories/user.repository.js";
import { HttpError } from "../security/errors.js";
import { signToken } from "../security/jwt.js";
import { comparePassword, hashPassword } from "../security/password.js";
import { validateCredentials } from "../security/validation.js";
import type { PublicUser, User, UserInput } from "../types/user.types.js";

const validate = (data: UserInput): void => {
  const errors = validateCredentials(data);
  if (errors.length > 0) {
    throw new HttpError(400, errors.join(" "));
  }
};

const toPublicUser = ({ id, email, created_at }: User): PublicUser => ({
  id,
  email,
  created_at,
});

export const register = async (
  data: UserInput,
): Promise<{ user: PublicUser; token: string }> => {
  validate(data);
  const email = data.email.trim().toLowerCase();
  if (await userRepository.findByEmail(email)) {
    throw new HttpError(409, "An account with this email already exists.");
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
  validate(data);
  const email = data.email.trim().toLowerCase();
  const user = await userRepository.findByEmail(email);
  if (!user || !(await comparePassword(data.password, user.password_hash))) {
    throw new HttpError(401, "Invalid email or password.");
  }
  const publicUser = toPublicUser(user);
  return { user: publicUser, token: signToken(publicUser) };
};