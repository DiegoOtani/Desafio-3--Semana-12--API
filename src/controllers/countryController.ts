import { Request, Response } from "express";
import { createCountry, getCountries, updateCountryById } from "../services/countryService";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";
import { Country } from "../models/countryModel";

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
    const { name, continent, urlImg } = req.body;

    const updates: Partial<Country> = {};

    if(name) updates.name = name;
    if(continent) updates.continent = continent;
    if(urlImg) updates.urlImg = urlImg;

    if(Object.keys(updates).length === 0) return res.status(400).json({ error: "No fields provided for update" });

    const updatedCountry = await updateCountryById(id, updates);
    return updatedCountry.error
      ? res.status(400).json({ country: null, error: updatedCountry.error })
      : res.status(200).json({ country: updatedCountry.country, message: "Country updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: 'Error searching countries' });
  }
}