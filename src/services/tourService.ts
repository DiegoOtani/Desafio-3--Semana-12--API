import { TourType, TourReturned } from "../models/tourModel";
import { openDb } from "../config/database";
import { getKeysAndValuesToInsert, getKeysAndValuesToUpdate } from "../helpers/crudHelper";
import { destinationExistsById } from "./destinationService";
import { typeExstsById } from "./typeService";

export const tourExistsById = async(id: string) => {
  const db = await openDb();
  return db.get(`SELECT * FROM Tours WHERE id = ?`, [id]);
};

export const createTour = async( tour: TourType, types: string[]): Promise<{ tour: TourType | null, error: string | null }> => {
  const db = await openDb();
  const tourExists = await tourExistsById(tour.id);
  if(tourExists) return { tour: null, error: "Tour alredy registered" };
  const destinationExists = await destinationExistsById(tour.city);
  if(!destinationExists) return { tour: null, error: 'Invalid destination' };
  
  for(const typeId of types) {
    const typeExists = await typeExstsById(typeId);
    if(!typeExists) return { tour: null, error: "Invalid type" };
  }

  const { keys, valuesQuery, values } = getKeysAndValuesToInsert(tour);
  try {
    await db.run(`
      INSERT INTO Tours (${keys})  
      VALUES (${valuesQuery})
    `, values);
    
    for(const typeId of types) {
      await db.run(`
        INSERT INTO TourTypes (tour_id, type_id)  
        VALUES (?, ?)
      `, [tour.id, typeId]);
    }
    
    const createdTour = await tourExistsById(tour.id);
    return !createdTour
      ? { tour: null, error: 'Error creating tour' }
      : { tour: createdTour, error: null }
  } catch (error) {
    return { tour: null, error: 'Error creating tour' };
  }
};

export const getTours = async(): Promise<TourReturned[]> => {
  const db = await openDb();
  return db.all(`
    SELECT 
    Tours.id AS tour_id,
    Tours.name AS tour_name,
    Destinations.city AS city,
    Tours.initial_date,
    Tours.end_date,
    Tours.duration,
    Tours.price_per_person,
    Tours.peoples,
    Tours.max_people,
    Tours.min_age,
    Tours.overview,
    Tours.location,
    Tours.ulrImg,
    GROUP_CONCAT(Types.name) AS types
FROM 
    Tours
JOIN 
    Destinations ON Tours.city = Destinations.id
JOIN 
    TourTypes ON Tours.id = TourTypes.tour_id
JOIN 
    Types ON TourTypes.type_id = Types.id
GROUP BY 
    Tours.id;
  `);
};

export const updateTourById = async(id: string, updates: Partial<TourType>): Promise<{
  tour: TourType | null, error: string | null
}> => {
  const db = await openDb();

  const existsTour = await tourExistsById(id);
  if(!existsTour) return { tour: null, error: 'Tour not found' };

  const{ keys, values } = getKeysAndValuesToUpdate(updates);

  try {
    await db.run(`UPDATE Tours SET ${keys} WHERE id = ?`, [...values, id]);
    const updatedTour = await db.get(`SELECT * FROM Tours WHERE id = ?`, [id]);
    return { tour: updatedTour, error: null };
  } catch (error) {
    return { tour: null, error: 'Error updating tour' };
  }
};

export const deleteTourById = async(id: string): Promise<{ tour: TourType | null, error: string | null }> => {
  const db = await openDb();
  
  const existsTour = await tourExistsById(id);
  if(!existsTour) return { tour: null, error: 'Tour not founded' };

  try {
    await db.run(`DELETE FROM Tours WHERE id = ?`, [id]);
    return { tour: existsTour, error: null };
  } catch (error) {
    return { tour: null, error: 'Error deleting tour' };
  }
};