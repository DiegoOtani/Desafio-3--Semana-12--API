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

  const tourExists = tourExistsById(review.tour_id);
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
  }
};