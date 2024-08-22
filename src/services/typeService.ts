import { Type } from "../models/typeModel";
import { openDb } from "../config/database";

export const createType = async ({ id, name }: Type): Promise<{ id: string | null, error: string | null }> => {
  const db = await openDb();
  await db.run(`INSERT INTO Type(id, name) VALUES (?, ?)`, [id, name]);
  const createdType = await db.get('SELECT * FROM Type WHERE id = ?', [id]);
  return !createdType 
    ? { id: null, error: 'Error creating type' }
    : { id, error: null }
};
