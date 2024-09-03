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

export const getTours = async (): Promise<TourReturned[]> => {
  const db = await openDb();
  return db.all(`
    SELECT 
      Tours.id AS tour_id,
      Tours.name AS tour_name,
      Destinations.city AS city,
      Country.name AS country_name,
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
      GROUP_CONCAT(Types.name) AS types,
      COUNT(Reviews.id) AS review_count,
      AVG(Reviews.average) AS average_review
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    LEFT JOIN 
      Reviews ON Tours.id = Reviews.tour_id
    GROUP BY 
      Tours.id;
  `);
};

export const getToursByPage = async (
  page: number = 1, 
  limit: number = 9,
  categories: string[] = [],
  countryDestinations: string[] = [],
  rating: number = 0,
  search: string,
  price: number,
  date: string,
  sortBy: string = "Title"
): Promise<{ tours: TourReturned[], total: number }> => {
  const db = await openDb();
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      Tours.id AS tour_id,
      Tours.name AS tour_name,
      Destinations.city AS city,
      Country.name AS country_name,
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
      GROUP_CONCAT(DISTINCT Types.name) AS types,
      COUNT(DISTINCT Reviews.id) AS review_count,
      AVG(Reviews.average) AS average_review
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    LEFT JOIN 
      Reviews ON Tours.id = Reviews.tour_id
  `;

  const conditions: string[] = [];
  const parameters: any[] = [];

  if (categories.length > 0) {
    conditions.push(`Types.name IN (${categories.map(() => '?').join(',')})`);
    parameters.push(...categories);
  }

  if (countryDestinations.length > 0) {
    conditions.push(`Country.name IN (${countryDestinations.map(() => '?').join(',')})`);
    parameters.push(...countryDestinations);
  }

  if (rating > 0) {
    conditions.push(`Reviews.average >= ?`);
    parameters.push(rating);
  }

  if (search) {
    conditions.push(`(Tours.name LIKE ? OR Destinations.city LIKE ?)`);
    parameters.push(`%${search}%`, `%${search}%`);
  }

  if (price > 0) {
    conditions.push(`Tours.price_per_person >= ?`);
    parameters.push(price);
  }

  if (date) {
    conditions.push(`Tours.initial_date >= ?`);
    parameters.push(date);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  query += ` GROUP BY Tours.id `;

  if (sortBy === "Price") {
    query += ` ORDER BY Tours.price_per_person ASC`;
  } else {
    query += ` ORDER BY Tours.name ASC`;
  }

  query += ` LIMIT ? OFFSET ?;`;

  const tours = await db.all<TourReturned[]>(query, [...parameters, limit, offset]);

  const countQuery = `
    SELECT COUNT(DISTINCT Tours.id) AS count
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    LEFT JOIN 
      Reviews ON Tours.id = Reviews.tour_id
    ${conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''}
  `;

  const total = await db.get<{ count: number }>(countQuery, parameters);

  return {
    tours,
    total: total?.count || 0
  };
};


export const getTourById = async(id: string): Promise<TourReturned> => {
  const db = await openDb();
  const tour = await db.get(`
    SELECT 
      Tours.id AS tour_id,
      Tours.name AS tour_name,
      Destinations.city AS city,
      Country.name AS country_name,
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
      GROUP_CONCAT(DISTINCT Types.name) AS types,
      COUNT(Reviews.id) AS review_count,
      AVG(Reviews.average) AS average_review
    FROM 
      Tours
    JOIN 
      Destinations ON Tours.city = Destinations.id
    JOIN 
      Country ON Destinations.country = Country.id
    JOIN 
      TourTypes ON Tours.id = TourTypes.tour_id
    JOIN 
      Types ON TourTypes.type_id = Types.id
    LEFT JOIN 
      Reviews ON Tours.id = Reviews.tour_id
    WHERE 
      Tours.id = ?
    GROUP BY 
      Tours.id;
  `, [id]);
  return tour || null;
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