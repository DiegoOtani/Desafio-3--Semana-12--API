import { CountryType } from "../models/countryModel";
import { openDb } from "../config/database";
import { getKeysAndValuesToUpdate } from "../helpers/updateHelper";

export const countryExists = async(name: string) => {
  const db = await openDb();
  return await db.get('SELECT * FROM Country WHERE name = ?', [name]);
}

export const countryExistsById = async(id: string) => {
  const db = await openDb();
  return await db.get('SELECT * FROM Country WHERE id = ?', [id]);
}

export const createCountry = async({ id, name, continent, urlImg }: CountryType): Promise<{ country: CountryType | null, error: string | null }> => {
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

export const getCountries = async(): Promise<CountryType[] | undefined> => {
  const db = await openDb();
  return db.all('SELECT * FROM Country');
};

export const updateCountryById = async(id: string, updates: Partial<CountryType>): Promise<{ country: CountryType | null, error: any | null }> => {
  const db = await openDb();

  const existsCountry = await countryExistsById(id);
  if (!existsCountry) return { country: null, error: 'Country not found' };

  const { keys, values } = getKeysAndValuesToUpdate(id, updates);

  try {
    await db.run(`UPDATE Country SET ${keys} WHERE id = ?`, values);
    const updatedCountry = await db.get(`SELECT * FROM Country WHERE id = ?`, [id]);
    return { country: updatedCountry, error: null };
  } catch (error) {
    return { country: null, error };
  }
};

export const deleteCountryById = async (id: string): Promise<{ country: CountryType | null, error: string | null }> => {
  const db = await openDb();

  const existsCountry = await countryExistsById(id);
  if(!existsCountry) return { country: null, error: 'Country not found' };

  try {
    await db.run(`DELETE FROM Country WHERE id = ?`, [id]);
    return { country: existsCountry, error: null };
  } catch (error) {
    return { country: null, error: 'Error deleting country' };
  }
}