import { Router } from "express";
import { registerType, getAllTypes, updateType, deleteType } from "../controllers/typeController";

const router = Router();

router.get('/', getAllTypes);
router.post('/', registerType);
router.put('/:id', updateType);
router.delete('/:id', deleteType);
export default router;