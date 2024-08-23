import { Router } from "express";
import { registerTour, getAllTours, updateTour } from "../controllers/tourController";

const router = Router();

router.get('/', getAllTours);
router.post('/', registerTour);
router.put('/:id', updateTour);

export default router;