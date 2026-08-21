import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing: set it in backend/.env");
}

const hostname = new URL(connectionString).hostname;
const isLocalDb = ["localhost", "127.0.0.1", "::1"].includes(hostname);

export const pool = new Pool({
  connectionString,
  ssl: isLocalDb ? false : { rejectUnauthorized: false },
  connectionTimeoutMillis: 10000,
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
