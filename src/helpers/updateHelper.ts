export const getKeysAndValuesToUpdate = <T extends object>(id: string, updates: T) => {
  const keys = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
  const values = [...Object.values(updates), id];
  return { keys, values };
};

export const generateUpdates = <T>(fields: Partial<T>, body: Partial<T>): Partial<T> => {
  const updates: Partial<T> = {};

  for(const key in fields) {
    if(body[key] !== undefined) updates[key] = body[key];
  };

  return updates;
};