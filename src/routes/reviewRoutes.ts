import { Router } from "express";
import { registerReview, getAllReviews, updateReview } from "../controllers/reviewController";

const router = Router();

router.post('/', registerReview);
router.get('/', getAllReviews);
router.put('/:id', updateReview);

export default router;