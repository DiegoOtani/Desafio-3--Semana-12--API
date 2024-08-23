export const getKeysAndValuesToUpdate = <T extends object>( updates: T) => {
  const keys = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
  const valuesQuery = Object.keys(updates).map(() => '?').join(', ');
  const values = [...Object.values(updates)];
  return { keys, valuesQuery, values };
};

export const getKeysAndValuesToInsert = <T extends object>(data: T) => {
  const keys = Object.keys(data).join(', ');
  const valuesQuery = Object.keys(data).map(() => '?').join(', ');
  const values = Object.values(data);
  return { keys, valuesQuery, values };
};

export const generateUpdates = <T>(fields: Partial<T>, body: Partial<T>): Partial<T> => {
  const updates: Partial<T> = {};

  for(const key in fields) {
    if(body[key] !== undefined) updates[key] = body[key];
  };
  return updates;
};

export const generateCreates = <T extends object>(fields: T, body: Partial<T>): Partial<T> => {
  const createFields: Partial<T> = {};

  for (const key in fields) {
    if (body[key] !== undefined) {
      createFields[key] = body[key];
    }
  }
  return createFields;
}
