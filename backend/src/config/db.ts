import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const isRemote = !(
  process.env.PGHOST === "localhost" || process.env.PGHOST === "127.0.0.1"
);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: isRemote ? { rejectUnauthorized: false } : undefined,
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to the database");
    client.release();
  })
  .catch((err: Error) => {
    console.error("Error connecting to the database", err.message);
  });
