import { pool } from "./db.js";
import { hashPassword } from "../security/password.js";

const DEFAULT_EMAIL = "admin@example.com";
const DEFAULT_PASSWORD = "admin123";

export const seedDatabase = async (): Promise<void> => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [
    DEFAULT_EMAIL,
  ]);
  if (existing.rows.length === 0) {
    await pool.query(
      "INSERT INTO users(email, password_hash) VALUES($1, $2) ON CONFLICT (email) DO NOTHING",
      [DEFAULT_EMAIL, await hashPassword(DEFAULT_PASSWORD)],
    );
    console.log(`Seeded default user: ${DEFAULT_EMAIL} / ${DEFAULT_PASSWORD}`);
  }
};