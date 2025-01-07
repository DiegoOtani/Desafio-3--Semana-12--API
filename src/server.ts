import app from "./config/app";
import { setupDatabase } from "./config/database";
import { VercelRequest, VercelResponse } from "@vercel/node";

let isDatabaseConnected = false;

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (!isDatabaseConnected) {
      await setupDatabase();
      isDatabaseConnected = true;
    }

    app(req, res);
  } catch (error) {
    console.error("Error setting up the server:", error);
    res.status(500).send("Internal server error");
  }
};
