import { Destination } from "../models/destinationsModel";
import { openDb } from "../config/database";;

export const destinationExists = async(city: string) => {
  const db = await openDb();
  return db.get('SELECT * FROM Destinations WHERE city = ?', [city])
};

export const destinationExistsById = async(id: string) => {
  const db = await openDb();
  return db.get(`SELECT * FROM Destinations WHERE id = ?`, [id]);
};

export const countryIsRegistered = async(id:string) => {
  const db = await openDb();
  return db.get('SELECT * FROM Country WHERE id = ?', [id]);
};

export const createDestination = async({ id, country, city }: Destination): Promise<{ destination: Destination | null, error: string | null }> => {
  const db = await openDb();

  const existsDestination = await destinationExists(city);
  if(existsDestination) return { destination: null, error: 'Destination already registered' };

  const registeredCountry = await countryIsRegistered(country);
  if(!registeredCountry) return { destination: null, error: 'Invalid Country Id' };

  await db.run(`
    INSERT INTO Destinations (id, country, city)
    VALUES (?, ?, ?)`, [id, country, city]);
  const createdDestination = await db.get('SELECT * FROM Destinations WHERE id = ?', [id]);
  return !createdDestination
    ? { destination: null, error: "Error creating destination" }
    : { destination: createdDestination, error: null }
};

export const getDestinations = async(): Promise<Destination[]> => {
  const db = await openDb();
  return db.all(`
    SELECT 
      Destinations.id, 
      Country.name as country,
      Destinations.city
    FROM 
      Destinations
    JOIN
      Country
    ON
      Destinations.country = Country.id
  `);
};