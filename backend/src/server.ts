import dotenv from "dotenv";
import app from "./app.js";
import { seedDatabase } from "./config/seed.js";

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

async function start(): Promise<void> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await seedDatabase();
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
      return;
    } catch (err) {
      console.error(
        `Failed to initialize database (attempt ${attempt}/${MAX_RETRIES}):`,
        (err as Error).message,
      );
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  process.exit(1);
}

start();