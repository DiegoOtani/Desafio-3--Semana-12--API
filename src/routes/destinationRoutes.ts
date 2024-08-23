import { Router } from "express";
import { registerDestination } from "../controllers/destinationController";

const router = Router();

router.post('/', registerDestination);

export default router;