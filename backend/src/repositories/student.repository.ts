import { pool } from "../config/db.js";
import type { Student, StudentInput } from "../types/student.types.js";

export interface StudentStats {
  total: number;
  average_age: number | null;
  min_age: number | null;
  max_age: number | null;
  created_this_week: number;
}

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
    [student.first_name, student.last_name, student.email, student.age ?? null],
  );
  return result.rows[0] || null;
}

export async function update(
  id: number,
  student: StudentInput,
): Promise<Student | null> {
  const result = await pool.query<Student>(
    "UPDATE students SET first_name = $1, last_name = $2, email = $3, age = $4 WHERE id = $5 RETURNING *",
    [student.first_name, student.last_name, student.email, student.age ?? null, id],
  );
  return result.rows[0] || null;
}

export async function remove(id: number): Promise<void> {
  await pool.query("DELETE FROM students WHERE id = $1", [id]);
}

export async function findStats(): Promise<StudentStats> {
  const result = await pool.query<StudentStats>(
    `SELECT COUNT(*)::int AS total,
            ROUND(AVG(age))::int AS average_age,
            MIN(age)::int AS min_age,
            MAX(age)::int AS max_age,
            COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS created_this_week
     FROM students`,
  );
  return result.rows[0]!;
}
