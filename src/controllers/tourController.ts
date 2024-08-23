import { Request, Response } from "express";
import { createTour, getTours } from "../services/tourService";
import { v4 as uuidv4 } from 'uuid';
import { tour, TourType } from "../models/tourModel";
import { generateCreates } from "../helpers/crudHelper";

export const registerTour = async(req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const createFields = generateCreates<TourType>(tour, req.body);
    const createFieldsWithId = {id,...createFields,};
    const types = req.body.types || [];
    const createdTour = await createTour(createFieldsWithId as TourType, types);
    createdTour.error
      ? res.status(400).json({ tour: null, error: createdTour.error })
      : res.status(201).json({ tour: createdTour.tour, message: 'Tour created successfuuly' });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating tour' });
  }
};

export const getAllTours = async(req: Request, res: Response) => {
  try {
    const tours = await getTours();
    return res.status(200).json({ tours });
  } catch (error) {
    return res.status(500).json({ error: 'Error searching tours' });
  }
}