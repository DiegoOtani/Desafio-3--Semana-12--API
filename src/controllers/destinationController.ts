import { Request, Response } from "express";
import { createDestination, getDestinations } from "../services/destinationService";
import { v4 as uuidv4 } from "uuid";
import { Destination } from "../models/destinationsModel";

export const registerDestination = async(req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { country, city } = req.body;
    const createdDestination = await createDestination({id, country, city});
    return createdDestination.error
      ? res.status(400).json({ destination: null, error: createdDestination.error })
      : res.status(201).json({ destination: createdDestination, message: 'Destination created successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating destination' });
  }
};

export const getAllDestinations = async(req: Request, res: Response) => {
  try {
    const destinations = await getDestinations();
    return res.status(200).json({ destinations });
  } catch (error) {
    return res.status(500).json({ error: "Error searching destinations" });
  }
}