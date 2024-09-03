import { Request, Response } from "express";
import { createTour, getTours, updateTourById, deleteTourById, getToursByPage, getTourById } from "../services/tourService";
import { v4 as uuidv4 } from 'uuid';
import { tour, TourType } from "../models/tourModel";
import { generateCreates, generateUpdates } from "../helpers/crudHelper";

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
  };
};

export const getAllTours = async(req: Request, res: Response) => {
  try {
    const tours = await getTours();
    return res.status(200).json({ tours });
  } catch (error) {
    return res.status(500).json({ error: 'Error searching tours' });
  };
};

export const getAllToursByPage = async(req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;

    const categories = (req.query.categories as string)?.split(',') || [];
    const destinations = (req.query.destinations as string)?.split(',') || [];
    const rating = Number(req.query.rating) || 0;
    const search = (req.query.search as string) || "";
    const price = Number(req.query.price) || 0;
    const date = (req.query.date as string || "");
    const {tours, total} = await getToursByPage(page, limit, categories, destinations, rating, search, price, date);

    res.status(200).json({ tours, total, currentPage: page, totalPages: Math.ceil((total || 0) / limit) });
  } catch (error) {
    res.status(500).json({ error: 'Error searching tours' });
  };
};

export const findTourById = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tour = await getTourById(id);
    !tour
      ? res.status(400).json({ error: 'Tour not found' })
      : res.status(200).json({ tour });
  } catch (error) {
    res.status(500).json({ error: 'Error searching tour.' });
  }
};

export const updateTour = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = generateUpdates(tour, req.body);

    if(Object.keys(updates).length === 0) return res.status(400).json({ error: 'No fields provided for update' });

    const updatedTour = await updateTourById(id, updates);
    return updatedTour.error
      ? res.status(400).json({ tour: null, error: updatedTour.error })
      : res.status(200).json({ tour: updatedTour.tour, message: 'Tour updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating tour' });
  }
};

export const deleteTour = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTour = await deleteTourById(id);
    return deletedTour.error
      ? res.status(400).json({ tour: null, error: deletedTour.error })
      : res.status(200).json({ tour: deletedTour.tour, message: 'Tour deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting tour' });
  }
};