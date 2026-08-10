import { pool } from "../config/db.js";
import type { Student, StudentInput } from "../types/student.types.js";

export async function findAll(): Promise<Student[]> {
  const result = await pool.query<Student>(
    "SELECT * FROM students ORDER BY id ASC",
  );
  return result.rows;
}

export async function findById(id: number): Promise<Student | null> {
  const result = await pool.query<Student>(
    "SELECT * FROM students WHERE id = $1",
    [id],
  );
  return result.rows[0] || null;
}

export async function create(student: StudentInput): Promise<Student | null> {
  const result = await pool.query<Student>(
    "INSERT INTO students(first_name,last_name,email,age) VALUES($1,$2,$3,$4) RETURNING *",
    [student.first_name, student.last_name, student.email, student.age],
  );
  return result.rows[0] || null;
}

export async function update(
  id: number,
  student: StudentInput,
): Promise<Student | null> {
  const result = await pool.query<Student>(
    "UPDATE students SET first_name = $1, last_name = $2, email = $3, age = $4 WHERE id = $5 RETURNING *",
    [student.first_name, student.last_name, student.email, student.age, id],
  );
  return result.rows[0] || null;
}

export async function remove(id: number): Promise<void> {
  await pool.query("DELETE FROM students WHERE id = $1", [id]);
}
