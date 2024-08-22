import { Request, Response } from "express";
import { createType, getTypes } from "../services/typeService";
import { v4 as uuidv4 } from "uuid";

export const registerType = async(req: Request, res: Response) => {
  try {
    const id = uuidv4();
    const { name } = req.body;
    const createdType = await createType({id, name});
    return createdType.error 
      ? res.status(400).json({ id: null, error: createdType.error })
      : res.status(201).json({ id: createdType.id, message: 'Type registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating type' });
  }
}

export const getAllTypes = async(req: Request, res: Response) => {
  try {
    const types = await getTypes();
    return res.status(200).json({ types });
  } catch (error) {
    res.status(500).json({ error: 'Error searching type' });
  }
}