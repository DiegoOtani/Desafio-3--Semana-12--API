import { Router } from "express";
import { registerCountry, getAllCountries, updateCountry, deleteCountry } from "../controllers/countryController";

const router = Router();

router.get('/', getAllCountries);
router.post('/', registerCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

export default router;