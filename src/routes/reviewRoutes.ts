import { Router } from "express";
import { registerReview, getAllReviews } from "../controllers/reviewController";

const router = Router();

router.post('/', registerReview);
router.get('/', getAllReviews);

export default router;