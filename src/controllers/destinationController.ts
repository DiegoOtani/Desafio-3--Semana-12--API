import { Request, Response } from "express";
import { createDestination, getDestinations, updateDestinationById, deleteDestinationById } from "../services/destinationService";
import { v4 as uuidv4 } from "uuid";
import { destination } from "../models/destinationsModel";
import { generateUpdates } from "../helpers/updateHelper";

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
};

export const updateDestination = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = generateUpdates(destination, req.body);

    if(Object.keys(updates).length === 0) return res.status(400).json({ error: 'No fields provided for update' });

    const updatedDestination = await updateDestinationById(id, updates);
    return updatedDestination.error
      ? res.status(400).json({ destination: null, error: updatedDestination.error })
      : res.status(200).json({ destination: updatedDestination.destination, message: 'Destination updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating destination' });
  }
};

export const deleteDestination = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedDestination = await deleteDestinationById(id);
    return deletedDestination.error
      ? res.status(400).json({ destination: null, error: deletedDestination.error })
      : res.status(200).json({ destination: deletedDestination.destination, message: "Destination deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deletin destination" });
  }
}