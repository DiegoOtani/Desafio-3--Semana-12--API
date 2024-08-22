import { Router } from "express";
import { registerCountry } from "../controllers/countryController";

const router = Router();

router.post('/', registerCountry);

export default router;