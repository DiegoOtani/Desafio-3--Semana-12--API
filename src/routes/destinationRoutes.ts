import { Router } from "express";
import { registerDestination, getAllDestinations, updateDestination } from "../controllers/destinationController";

const router = Router();

router.get('/', getAllDestinations);
router.post('/', registerDestination);
router.put('/:id', updateDestination);

export default router;