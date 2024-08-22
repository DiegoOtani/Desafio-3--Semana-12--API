import { Country, CountryUpdate } from "../models/countryModel";
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

export const getCountries = async(): Promise<Country[] | undefined> => {
  const db = await openDb();
  return db.all('SELECT * FROM Country');
};

export const updateCountryById = async(id: string, updates: CountryUpdate): Promise<{ country: Country | null, error: any | null }> => {
  const db = await openDb();

  const existsCountry = await countryExistsById(id);
  if (!existsCountry) return { country: null, error: 'Country not found' };

  const setKeys = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
  const values = [...Object.values(updates), id];
  
  try {
    await db.run(`UPDATE Country SET ${setKeys} WHERE id = ?`, values);
    const updatedCountry = await db.get(`SELECT * FROM Country WHERE id = ?`, [id]);
    return { country: updatedCountry, error: null };
  } catch (error) {
    return { country: null, error };
  }
};
