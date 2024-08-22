import { Router } from "express";
import { registerType, getAllTypes } from "../controllers/typeController";

const router = Router();

router.get('/', getAllTypes);
router.post('/', registerType);

export default router;