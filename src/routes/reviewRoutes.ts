import { Router } from "express";
import { 
  registerReview, 
  getAllReviews, 
  updateReview, 
  deleteReview, 
  getAverageReviewById 
} from "../controllers/reviewController";

const router = Router();

router.post('/', registerReview);
router.get('/', getAllReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

router.get('/avg/:id', getAverageReviewById);

export default router;