import { Router } from "express";
import { registerType } from "../controllers/typeController";

const router = Router();

router.post('/', registerType);

export default router;