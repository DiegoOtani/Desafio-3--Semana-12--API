import { Router } from "express";
import { registerDestination, getAllDestinations, updateDestination, deleteDestination } from "../controllers/destinationController";

const router = Router();

router.get('/', getAllDestinations);
router.post('/', registerDestination);
router.put('/:id', updateDestination);
router.delete('/:id', deleteDestination);

export default router;