import { Router } from "express";
import { registerCountry, getAllCountries } from "../controllers/countryController";

const router = Router();

router.get('/', getAllCountries);
router.post('/', registerCountry);

export default router;