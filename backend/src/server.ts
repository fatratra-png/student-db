import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT: number = Number(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Server is launched on http://localhost${PORT}`);
});
