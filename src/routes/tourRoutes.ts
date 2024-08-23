import { Router } from "express";
import { registerTour, getAllTours } from "../controllers/tourController";

const router = Router();

router.get('/', getAllTours);
router.post('/', registerTour);

export default router;