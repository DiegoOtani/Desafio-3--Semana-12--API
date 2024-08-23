import { Router } from "express";
import { registerTour } from "../controllers/tourController";

const router = Router();

router.post('/', registerTour);

export default router;