import { ReviewType } from "../models/reviewsModel";
import { openDb } from "../config/database";
import { getKeysAndValuesToInsert, getKeysAndValuesToUpdate } from "../helpers/crudHelper";
import { tourExistsById } from "./tourService";

export const reviewExistsById = async(id: string) => {
  const db = await openDb();
  return db.get(`SELECT * FROM Reviews WHERE id = ?`, [id]);
};

export const createReview = async(review: ReviewType): Promise<{ review: ReviewType | null, error: string | null }> => {
  const db = await openDb();

  const reviewExists = await reviewExistsById(review.id);
  if(reviewExists) return { review: null, error: 'Review already registered' };

  const tourExists = await tourExistsById(review.tour_id);
  if(!tourExists) return { review: null, error: 'Tour not founded' };

  const { keys, valuesQuery, values } = getKeysAndValuesToInsert(review);
  try {
    await db.run(`
      INSERT INTO Reviews (${keys})  
      VALUES (${valuesQuery})
    `, values);

    const createdReview = await reviewExistsById(review.id);
    return !createdReview
      ? { review: null, error: 'Error creatin review' }
      : { review: createdReview, error: null };
  } catch (error) {
    return { review: null, error: 'Error creating review'};
  };
};

export const getReview = async(): Promise<ReviewType[]> => {
  const db = await openDb();
  return db.all(`SELECT * FROM Reviews`);
};

export const getReviewAveragesByTourId = async (tourId: string) => {
  const db = await openDb();
  
  const tourExists = await tourExistsById(tourId);
  if(!tourExists) return { review: null, error: 'Tour not founded' };

  const result = await db.get(`
    SELECT 
      AVG(services) AS avg_services,
      AVG(prices) AS avg_prices,
      AVG(locations) AS avg_locations,
      AVG(food) AS avg_food,
      AVG(amenities) AS avg_amenities,
      AVG(room_comfort_quality) AS avg_room_comfort_quality,
      AVG(average) AS avg_overall
    FROM Reviews
    WHERE tour_id = ?;
    `,
    [tourId]
  );

  return result;
};

export const updateReviewById = async(id:string,  updates: Partial<ReviewType>): Promise<{
  review: ReviewType | null, error: string | null
}> => {
  const db = await openDb();

  const existsReview = reviewExistsById(id);
  if(!existsReview) return { review: null, error: 'Review not found' };

  const { keys, values } = getKeysAndValuesToUpdate(updates);

  try {
    await db.run(`UPDATE Reviews SET ${keys} WHERE id = ?`,[...values, id]);
    const updatedReview = await db.get(`SELECT * FROM Reviews WHERE id = ?`, [id]);
    return { review: updatedReview, error: null };
  } catch (error) {
    return { review: null, error: 'Error updating review' };
  };
};

export const deleteReviewById = async(id: string): Promise<{ review: ReviewType | null, error: string | null }> => {
  const db = await openDb();
  
  const existsReview = await reviewExistsById(id);
  if(!existsReview) return { review: null, error: 'Review not found' };

  try {
    await db.run(`DELETE FROM Reviews WHERE id = ?`, [id]);
    return { review: existsReview, error: null };
  } catch (error) {
    return { review: null, error: 'Error deleting review' };
  };
};