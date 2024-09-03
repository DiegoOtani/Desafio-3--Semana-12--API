import { Router } from "express";
import { 
  registerTour, 
  getAllTours, 
  updateTour, 
  deleteTour, 
  getAllToursByPage,
  findTourById 
} from "../controllers/tourController";

const router = Router();

router.get('/', getAllTours);
router.post('/', registerTour);
router.put('/:id', updateTour);
router.delete('/:id', deleteTour);

router.get('/page', getAllToursByPage);
router.get('/:id', findTourById);

export default router;