import { Request, Response } from "express";
import { createType, getTypes, updateTypeById, deleteTypeById } from "../services/typeService";
import { v4 as uuidv4 } from "uuid";
import { error } from "console";

export const registerType = async(req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { name } = req.body;
    const createdType = await createType({id, name});
    return createdType.error 
      ? res.status(400).json({ type: null, error: createdType.error })
      : res.status(201).json({ type: createdType.type, message: 'Type registered successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error creating type' });
  }
};

export const getAllTypes = async(req: Request, res: Response) => {
  try {
    const types = await getTypes();
    return res.status(200).json({ types });
  } catch (error) {
    return res.status(500).json({ error: 'Error searching type' });
  }
};

export const updateType = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedType = await updateTypeById({id, name});
    return updatedType.error 
      ? res.status(400).json({ type: null, error: updatedType.error })
      : res.status(200).json({ type: updatedType.type, message: 'Type updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating type' });
  }
};

export const deleteType = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedType = await deleteTypeById(id);
    return deletedType.error 
      ? res.status(400).json({ type: null, error: deletedType.error })
      : res.status(200).json({ type: deletedType.type, message: 'Type deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting type' });
  }
}