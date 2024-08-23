import { Request, Response } from "express";
import { createReview } from "../services/reviewsService";
import { v4 as uuidv4 } from "uuid";
import { review, ReviewType } from "../models/reviewsModel";
import { generateCreates, generateUpdates } from "../helpers/crudHelper";

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
  }
};