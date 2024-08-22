import { Router } from "express";
import { registerType, getAllTypes, updateType } from "../controllers/typeController";

const router = Router();

router.get('/', getAllTypes);
router.post('/', registerType);
router.put('/', updateType);

export default router;