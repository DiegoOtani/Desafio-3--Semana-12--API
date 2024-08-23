import { Router } from "express";
import { registerReview } from "../controllers/reviewController";

const router = Router();

router.post('/', registerReview);

export default router;