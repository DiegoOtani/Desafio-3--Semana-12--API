import { Router } from "express";
import { 
  registerReview, 
  getAllReviews, 
  updateReview, 
  deleteReview, 
  getAverageReviewById, 
  getReviewsByTour
} from "../controllers/reviewController";

const router = Router();

router.post('/', registerReview);
router.get('/', getAllReviews);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

router.get('/avg/:id', getAverageReviewById);
router.get('/tour/:id', getReviewsByTour);

export default router;