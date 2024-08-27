import { Request, Response } from "express";
import { createCountry, getCountries, updateCountryById, deleteCountryById } from "../services/countryService";
import { v4 as uuidv4 } from "uuid";
import { country } from "../models/countryModel";
import { generateUpdates } from "../helpers/crudHelper";

export const registerCountry = async(req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { name, continent, urlImg } = req.body;
    const createdCountry = await createCountry({id, name, continent, urlImg});
    return createdCountry.error
      ? res.status(400).json({ country: null, error: createdCountry.error })
      : res.status(201).json({ country: createdCountry.country, message: "Country registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating country' });
  }
};

export const getAllCountries = async(req: Request, res: Response) => {
  try {
    const countries = await getCountries();
    return res.status(200).json({ countries });
  } catch (error) {
    return res.status(500).json({ error: 'Error searching countries' });
  }
};

export const updateCountry = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = generateUpdates(country, req.body);

    if(Object.keys(updates).length === 0) return res.status(400).json({ error: "No fields provided for update" });

    const updatedCountry = await updateCountryById(id, updates);
    return updatedCountry.error
      ? res.status(400).json({ country: null, error: updatedCountry.error })
      : res.status(200).json({ country: updatedCountry.country, message: "Country updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating countries' });
  }
}

export const deleteCountry = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCountry = await deleteCountryById(id);
    return deletedCountry.error
      ? res.status(400).json({ country: null, error: deletedCountry })
      : res.status(200).json({ country: deletedCountry.country, message: 'Country deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting country' });
  }
}