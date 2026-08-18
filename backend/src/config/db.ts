import dns from "node:dns";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is missing: set it in backend/.env (see backend/.env.example)",
  );
}

const hostname = new URL(connectionString).hostname;

async function resolveHost(address: string): Promise<string> {
  try {
    const records = await dns.promises.lookup(address, {
      all: true,
      verbatim: true,
    });
    return (
      records.find((r) => r.family === 4)?.address ??
      records.find((r) => r.family === 6)?.address ??
      address
    );
  } catch {
    return address;
  }
}

const host = await resolveHost(hostname);

export const pool = new Pool({
  connectionString,
  host,
  ssl: { rejectUnauthorized: false },
  options: "-c search_path=public",
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