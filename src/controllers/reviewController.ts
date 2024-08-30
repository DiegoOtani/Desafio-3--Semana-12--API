import { Request, Response } from "express";
import { 
  createReview, 
  getReview, 
  updateReviewById, 
  deleteReviewById, 
  getReviewAveragesByTourId,
  getReviewsByTourId
} from "../services/reviewsService";
import { v4 as uuidv4 } from "uuid";
import { review, ReviewType } from "../models/reviewsModel";
import { generateCreates, generateUpdates } from "../helpers/crudHelper";
import { error } from "console";

export const registerReview = async(req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const createFields = generateCreates<ReviewType>(review, req.body);
    const createFieldsWithId = {id, ...createFields};
    const createdReview = await createReview(createFieldsWithId as ReviewType);
    return createdReview.error
      ? res.status(400).json({ review: null, error: createdReview.error })
      : res.status(200).json({ review: createdReview.review, message: 'Review created successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating review' });
  };
};

export const getAllReviews = async(req: Request, res: Response) => {
  try {
    const reviews = await getReview();
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ error: 'Erro searching reviews' });
  };
};

export const getAverageReviewById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await getReviewAveragesByTourId(id);
    return review.error
      ? res.status(400).json({ review: null, error: review.error })
      : res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({ error: 'Erro searching review' });
  }
};

export const getReviewsByTour = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reviews = await getReviewsByTourId(id);
    return reviews.error
      ? res.status(400).json({ review:null, error: reviews.error })
      : res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: 'Erro searching reviews' });
  }
};

export const updateReview = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = generateUpdates(review, req.body);

    if(Object.keys(updates).length === 0) return res.status(400).json({ error: 'No fields provided for update' });

    const updatedReview = await updateReviewById(id, updates);
    return updatedReview.error
      ? res.status(400).json({ review: null, error: updatedReview.error })
      : res.status(200).json({ review: updatedReview.review, message: 'Review updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating review' });
  };
};

export const deleteReview = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedReview = await deleteReviewById(id);
    return deletedReview.error
      ? res.status(400).json({ review: null, error: deletedReview.error })
      : res.status(200).json({ review: deletedReview.review, message: 'Review deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting review' });
  };
};