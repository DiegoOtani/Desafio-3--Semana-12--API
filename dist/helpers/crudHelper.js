"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCreates = exports.generateUpdates = exports.getKeysAndValuesToInsert = exports.getKeysAndValuesToUpdate = void 0;
const getKeysAndValuesToUpdate = (updates) => {
    const keys = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
    const valuesQuery = Object.keys(updates).map(() => '?').join(', ');
    const values = [...Object.values(updates)];
    return { keys, valuesQuery, values };
};
exports.getKeysAndValuesToUpdate = getKeysAndValuesToUpdate;
const getKeysAndValuesToInsert = (data) => {
    const keys = Object.keys(data).join(', ');
    const valuesQuery = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    return { keys, valuesQuery, values };
};
exports.getKeysAndValuesToInsert = getKeysAndValuesToInsert;
const generateUpdates = (fields, body) => {
    const updates = {};
    for (const key in fields) {
        if (body[key] !== undefined)
            updates[key] = body[key];
    }
    ;
    return updates;
};
exports.generateUpdates = generateUpdates;
const generateCreates = (fields, body) => {
    const createFields = {};
    for (const key in fields) {
        if (body[key] !== undefined) {
            createFields[key] = body[key];
        }
    }
    return createFields;
};
exports.generateCreates = generateCreates;
