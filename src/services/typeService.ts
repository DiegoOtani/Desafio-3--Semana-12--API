import { Type } from "../models/typeModel";
import { openDb } from "../config/database";

export const typeExists = async(name: string) => {
  const db = await openDb();
  return await db.get(` SELECT * FROM Types WHERE name = ?`, [name]);
};

export const typeExstsById = async(id: string) => {
  const db = await openDb();
  return await db.get(`SELECT * FROM Types WHERE id = ?`, [id]);
};

export const createType = async ({ id, name }: Type): Promise<{ type: Type | null, error: string | null }> => {
  const db = await openDb();
  
  const existsType = await typeExists(name);
  if(existsType) return { type: null, error: 'Type already registered' };

  await db.run(`INSERT INTO Types(id, name) VALUES (?, ?)`, [id, name]);
  const createdType = await db.get('SELECT * FROM Types WHERE id = ?', [id]);
  return !createdType 
    ? { type: null, error: 'Error creating type' }
    : { type: createdType, error: null };
};

export const getTypes = async(): Promise<Type[] | undefined> => {
  const db = await openDb();

  return db.all(`
    SELECT
      t.id AS type_id,
      t.name AS type_name,
      COUNT(tt.tour_id) AS tour_count,
      MIN(tour.price_per_person) AS min_price
    FROM
      Types t
    LEFT JOIN
      TourTypes tt ON t.id = tt.type_id
    LEFT JOIN
      Tours tour ON tt.tour_id = tour.id
    GROUP BY
      t.id, t.name;`);
};

export const updateTypeById = async({ id, name }: Type): Promise<{ type: Type | null, error: string | null }> => {
  const db = await openDb();

  const existsType = await typeExstsById(id);
  if(!existsType) return { type: null, error: 'Type not found' };

  try {
    await db.run(`UPDATE Types SET name = ? WHERE id = ?`, [name, id]);
    const updateType = await db.get('SELECT * FROM Types WHERE id = ?', [id]);
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
    await db.run('DELETE FROM Types WHERE id = ?', [id]);
    return { type: existsType, error: null };
  } catch (error) {
    return { type: null, error: 'Error deleting type' };
  }
}