import app from "./config/app";
import { setupDatabase } from "./config/database";

const PORT = 3000;

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
})