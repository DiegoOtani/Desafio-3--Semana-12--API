import { Router } from "express";
import { registerCountry, getAllCountries, updateCountry, deleteCountry, getAllCountriesByCont } from "../controllers/countryController";

const router = Router();

router.get('/', getAllCountries);
router.get('/cont', getAllCountriesByCont);
router.post('/', registerCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

export default router;