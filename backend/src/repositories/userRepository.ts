import { pool } from "../config/db.js";
import type { User, UserInput } from "../types/userTypes.js";

export async function findByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );
  return result.rows[0] || null;
}

export async function create(user: UserInput): Promise<User> {
  const result = await pool.query<User>(
    "INSERT INTO users(email, password_hash) VALUES($1, $2) RETURNING *",
    [user.email, user.password],
  );
  return result.rows[0]!;
}
