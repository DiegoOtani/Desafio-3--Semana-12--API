import { Router } from "express";
import { registerCountry, getAllCountries, updateCountry } from "../controllers/countryController";

const router = Router();

router.get('/', getAllCountries);
router.post('/', registerCountry);
router.put('/:id', updateCountry);

export default router;