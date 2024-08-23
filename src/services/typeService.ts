import { Type } from "../models/typeModel";
import { openDb } from "../config/database";

export const typeExists = async(name: string) => {
  const db = await openDb();
  return await db.get(` SELECT * FROM Type WHERE name = ?`, [name]);
};

export const typeExstsById = async(id: string) => {
  const db = await openDb();
  return await db.get(`SELECT * FROM Type WHERE id = ?`, [id]);
};

export const createType = async ({ id, name }: Type): Promise<{ type: Type | null, error: string | null }> => {
  const db = await openDb();
  
  const existsType = await typeExists(name);
  if(existsType) return { type: null, error: 'Type already registered' };

  await db.run(`INSERT INTO Type(id, name) VALUES (?, ?)`, [id, name]);
  const createdType = await db.get('SELECT * FROM Type WHERE id = ?', [id]);
  return !createdType 
    ? { type: null, error: 'Error creating type' }
    : { type: createdType, error: null };
};

export const getTypes = async(): Promise<Type[] | undefined> => {
  const db = await openDb();

  return db.all(`SELECT * FROM Type`);
};

export const updateTypeById = async({ id, name }: Type): Promise<{ type: Type | null, error: string | null }> => {
  const db = await openDb();

  const existsType = await typeExstsById(id);
  if(!existsType) return { type: null, error: 'Type not found' };

  try {
    await db.run(`UPDATE Type SET name = ? WHERE id = ?`, [name, id]);
    const updateType = await db.get('SELECT * FROM Type WHERE id = ?', [id]);
    return { type: updateType, error: null };
  } catch (error) {
    return { type: null, error: 'Error updating type' }
  }  
};

export const deleteTypeById = async(id: string): Promise<{ type: Type | null, error: string | null }> => {
  const db = await openDb();
  
  const existsType = await typeExstsById(id);
  if(!existsType) return { type: null, error: 'Type not found' };

  try {
    await db.run('DELETE FROM Type WHERE id = ?', [id]);
    return { type: existsType, error: null };
  } catch (error) {
    return { type: null, error: 'Error deleting type' };
  }
}