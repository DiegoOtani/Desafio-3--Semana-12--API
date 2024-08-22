import { Type } from "../models/typeModel";
import { openDb } from "../config/database";

export const typeExists = async(name: string) => {
  const db = await openDb();
  return await db.get(` SELECT * FROM Type WHERE name = ?`, [name]);
}

export const createType = async ({ id, name }: Type): Promise<{ id: string | null, error: string | null }> => {
  const db = await openDb();
  
  const existsType = await typeExists(name);
  if(existsType) return { id: null, error: 'Type already registered' };

  await db.run(`INSERT INTO Type(id, name) VALUES (?, ?)`, [id, name]);
  const createdType = await db.get('SELECT * FROM Type WHERE id = ?', [id]);
  return !createdType 
    ? { id: null, error: 'Error creating type' }
    : { id, error: null }
};

export const getTypes = async(): Promise<Type[] | undefined> => {
  const db = await openDb();

  return db.all(`SELECT * FROM Type`);
}