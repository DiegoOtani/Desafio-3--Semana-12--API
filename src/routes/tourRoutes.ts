import { Router } from "express";
import { registerTour, getAllTours, updateTour, deleteTour, getAllToursByPage } from "../controllers/tourController";

const router = Router();

router.get('/', getAllTours);
router.post('/', registerTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);
router.get('/page', getAllToursByPage);

export default router;