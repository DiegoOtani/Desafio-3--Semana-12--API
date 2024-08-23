import { Router } from "express";
import { registerDestination, getAllDestinations } from "../controllers/destinationController";

const router = Router();

router.get('/', getAllDestinations);
router.post('/', registerDestination);

export default router;