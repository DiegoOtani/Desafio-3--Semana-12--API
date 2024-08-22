import { Country } from "../models/countryModel";
import { openDb } from "../config/database";

export const countryExists = async(name: string) => {
  const db = await openDb();
  return await db.get('SELECT * FROM Country WHERE name = ?', [name]);
}

export const countryExistsById = async(id: string) => {
  const db = await openDb();
  return await db.get('SELECT * FROM Country WHERE id = ?', [id]);
}

export const createCountry = async({ id, name, continent, urlImg }: Country): Promise<{ country: Country | null, error: string | null }> => {
  const db = await openDb();

  const existsCountry = await countryExists(name);
  if(existsCountry) return { country: null, error: 'Country already registered' };
  await db.run(`
    INSERT INTO Country( id, name, continent, urlImg) 
    VALUES (?, ?, ?, ?)`, [id, name, continent, urlImg]);
  const createdCountry = await db.get('SELECT * FROM Country WHERE id = ?', [id]);
  return !createCountry
    ? { country: null, error: 'Error creating country' }
    : { country: createdCountry, error: null };
};