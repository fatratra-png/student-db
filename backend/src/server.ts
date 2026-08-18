import dotenv from "dotenv";
import app from "./app.js";
import { seedDatabase } from "./config/seed.js";

dotenv.config();

const PORT: number = Number(process.env.PORT);

seedDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is launched on http://localhost:${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error("Failed to initialize database:", err.message);
    process.exit(1);
  });