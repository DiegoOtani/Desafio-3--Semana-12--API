import { Router } from "express";
import { registerType, getAllTypes, updateType, deleteType } from "../controllers/typeController";

const router = Router();

router.get('/', getAllTypes);
router.post('/', registerType);
router.put('/', updateType);
router.delete('/', deleteType);
export default router;